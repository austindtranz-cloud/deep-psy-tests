const esbuild = require('esbuild');

esbuild.build({
  entryPoints: [
    'core/router.js',
    'core/quiz_core.js',
    'core/templates.js',
    'core/nav_controller.js',
    'core/grid_controller.js',
    'core/ui_controller.js',
    'core/integrations.js',
    'core/engine_results.js',
    'core/sidebar.js',
    'core/success_modal.js',
    'core/engine.js'
  ],
  bundle: false,
  minify: true,
  outdir: 'dist/temp',
}).then(() => {
  // Concat all into engine.min.js in the correct order
  const fs = require('fs');
  const path = require('path');

  const files = [
    'router.js',
    'quiz_core.js',
    'templates.js',
    'nav_controller.js',
    'grid_controller.js',
    'ui_controller.js',
    'integrations.js',
    'engine_results.js',
    'sidebar.js',
    'success_modal.js',
    'engine.js'
  ];

  let result = '';
  for (const file of files) {
    result += fs.readFileSync(path.join('dist/temp', file), 'utf8') + '\n';
  }

  fs.writeFileSync('dist/engine.min.js', result);
  fs.rmSync('dist/temp', { recursive: true, force: true });
  console.log('Build complete: dist/engine.min.js');
}).catch(() => process.exit(1));
