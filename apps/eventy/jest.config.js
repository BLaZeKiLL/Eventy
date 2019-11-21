module.exports = {
  name: 'eventy',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/eventy',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
