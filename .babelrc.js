module.exports = {
    presets: [
    	[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: "usage",
				debug: true,
				targets: {
					//browsers: ['last 2 versions']
					browsers: ['chrome>= 80', 'edge >= 80', 'firefox >= 80']
				}
			}
		],
		'@babel/react',
		'@babel/typescript'
    ],
	'plugins': [
        'react-hot-loader/babel',
        '@babel/proposal-class-properties',
	]
};