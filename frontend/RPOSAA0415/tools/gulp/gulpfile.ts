import { BuildHelper, BuildConfig, BuildEnvironment, BuildGulpPlugins } from '@morphe/build-angular';
const config = new BuildConfig(true);
config.opensslLegacy = false;
config.internalModule = [];
const helper = new BuildHelper(config);

const taskCreateManifest = 'create-manifest';

BuildGulpPlugins.gulp.task('upgrade-version', (done: () => void) => helper.upgradePackageVersion(BuildEnvironment.Debug, done));

BuildGulpPlugins.gulp.task('i18n', () => helper.i18n());
BuildGulpPlugins.gulp.task(taskCreateManifest, () => helper.createManifestFile());
BuildGulpPlugins.gulp.task('verify-package-list-debug', () => helper.verifyPackageList(BuildEnvironment.Debug));
BuildGulpPlugins.gulp.task('clean-debug', () => helper.clean(BuildEnvironment.Debug));
BuildGulpPlugins.gulp.task('build-debug', helper.buildAppTask(BuildEnvironment.Debug));
BuildGulpPlugins.gulp.task('rebuild-debug', BuildGulpPlugins.gulp.series(['clean-debug', taskCreateManifest, 'build-debug']));
BuildGulpPlugins.gulp.task('watch-debug', helper.watchAppTask(BuildEnvironment.Debug));

BuildGulpPlugins.gulp.task('verify-package-list-release', () => helper.verifyPackageList(BuildEnvironment.Release));
BuildGulpPlugins.gulp.task('clean-release', () => helper.clean(BuildEnvironment.Release));
BuildGulpPlugins.gulp.task('build-release', helper.buildAppTask(BuildEnvironment.Release));
BuildGulpPlugins.gulp.task('rebuild-release', BuildGulpPlugins.gulp.series(['clean-release', taskCreateManifest, 'build-release']));
BuildGulpPlugins.gulp.task('watch-release', helper.watchAppTask(BuildEnvironment.Release));

BuildGulpPlugins.gulp.task('default', () => BuildGulpPlugins.gulp.series(['rebuild-debug']));

// Lib
BuildGulpPlugins.gulp.task('upgrade-version-lib', (done: () => void) => helper.upgradePackageVersionLibrary(helper.getLibraryName(), done));
BuildGulpPlugins.gulp.task('clean', () => helper.cleanByName(helper.getLibraryName(), helper.getLibraryDistDirectory()));
BuildGulpPlugins.gulp.task('build-module', (done: () => void) => helper.compileModule(helper.getLibraryName(), false, done));
BuildGulpPlugins.gulp.task('create-documentation', (done: () => void) =>
    helper.createDocumentationLibrary(helper.getLibraryName(), helper.getLibraryDistDirectory(), done)
);
BuildGulpPlugins.gulp.task('pack', (done: () => void) =>
    helper.createPackageByLibrary(helper.getLibraryName(), helper.getLibraryDistDirectory(), done)
);
BuildGulpPlugins.gulp.task('rebuild-package', BuildGulpPlugins.gulp.series(['clean', 'build-module', 'create-documentation', 'pack']));
BuildGulpPlugins.gulp.task('release-package', BuildGulpPlugins.gulp.series(['upgrade-version-lib', 'rebuild-package']));
