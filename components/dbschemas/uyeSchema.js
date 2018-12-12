
 const uyeSchema = {
	name: 'Uyeler',
	properties: {
		username: 'string',
		mail: 'string',
		sifre: 'string',
		rank: { type: 'int', default: 0 },
		token: 'string',
		sepet: { type: 'int', default: 0 }
	},
};

export default uyeSchema