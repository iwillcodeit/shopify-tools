import { ExecutorContext } from '@nx/devkit';
import type { TypeScriptCompilationOptions } from '@nx/workspace/src/utilities/typescript/compilation';
import { CopyAssetsHandler } from '@nx/js/src/utils/assets/copy-assets-handler';
import { checkDependencies } from '@nx/js/src/utils/check-dependencies';
import { getHelperDependency, HelperDependency } from '@nx/js/src/utils/compiler-helper-dependency';
import { handleInliningBuild, isInlineGraphEmpty, postProcessInlinedDependencies } from '@nx/js/src/utils/inline';
import { updatePackageJson } from '@nx/js/src/utils/package-json/update-package-json';
import { ExecutorOptions, NormalizedExecutorOptions } from '@nx/js/src/utils/schema';
import { compileTypeScriptFiles } from '@nx/js/src/utils/typescript/compile-typescript-files';
import { watchForSingleFileChanges } from '@nx/js/src/utils/watch-for-single-file-changes';
import { getCustomTrasformersFactory, normalizeOptions } from '@nx/js/src/executors/tsc/lib';

export function createTypeScriptCompilationOptions(
  normalizedOptions: NormalizedExecutorOptions,
  context: ExecutorContext
): TypeScriptCompilationOptions {
  return {
    outputPath: normalizedOptions.outputPath,
    projectName: context.projectName,
    projectRoot: normalizedOptions.projectRoot,
    rootDir: normalizedOptions.rootDir,
    tsConfig: normalizedOptions.tsConfig,
    watch: normalizedOptions.watch,
    deleteOutputPath: normalizedOptions.clean,
    getCustomTransformers: getCustomTrasformersFactory(normalizedOptions.transformers),
  };
}

export async function* tscExecutor(_options: ExecutorOptions, context: ExecutorContext) {
  const { sourceRoot, root } = context.projectsConfigurations.projects[context.projectName];
  const options = normalizeOptions(_options, context.root, sourceRoot, root);

  const { projectRoot, tmpTsConfig, target, dependencies } = checkDependencies(context, _options.tsConfig);

  if (tmpTsConfig) {
    options.tsConfig = tmpTsConfig;
  }

  const tsLibDependency = getHelperDependency(
    HelperDependency.tsc,
    options.tsConfig,
    dependencies,
    context.projectGraph
  );

  if (tsLibDependency) {
    dependencies.push(tsLibDependency);
  }

  const assetHandler = new CopyAssetsHandler({
    projectDir: projectRoot,
    rootDir: context.root,
    outputDir: _options.outputPath,
    assets: _options.assets,
  });

  const tsCompilationOptions = createTypeScriptCompilationOptions(options, context);

  const inlineProjectGraph = handleInliningBuild(context, options, tsCompilationOptions.tsConfig);

  if (!isInlineGraphEmpty(inlineProjectGraph)) {
    tsCompilationOptions.rootDir = '.';
  }

  const typescriptCompilation = compileTypeScriptFiles(options, tsCompilationOptions, async () => {
    await assetHandler.processAllAssetsOnce();
    updatePackageJson(options, context, target, dependencies);
    postProcessInlinedDependencies(
      tsCompilationOptions.outputPath,
      tsCompilationOptions.projectRoot,
      inlineProjectGraph
    );
  });

  if (options.watch) {
    const disposeWatchAssetChanges = await assetHandler.watchAndProcessOnAssetChange();
    const disposePackageJsonChanges = await watchForSingleFileChanges(
      context.projectName,
      options.projectRoot,
      'package.json',
      () => updatePackageJson(options, context, target, dependencies)
    );
    const handleTermination = async (exitCode: number) => {
      await typescriptCompilation.close();
      disposeWatchAssetChanges();
      disposePackageJsonChanges();
      process.exit(exitCode);
    };
    process.on('SIGINT', () => handleTermination(128 + 2));
    process.on('SIGTERM', () => handleTermination(128 + 15));
  }

  return yield* typescriptCompilation.iterator;
}

export default tscExecutor;
