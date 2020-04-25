import resolve, {init} from '../index'

// Class definition
class TestClass {
	say() {
		console.log('Hello, world!');
	}
}

// Singleton definitions
const modules = [
	{
		create: async (r) => new TestClass(),
		as: TestClass,
	},
];

// Init and resolve
init(modules).then(() => {
	resolve(TestClass).say();
});
