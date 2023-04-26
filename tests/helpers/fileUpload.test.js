import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
	cloud_name: 'cloudictionary',
	api_key: '783117233447377',
	api_secret: 'FmSkG_K53NthnN32wbo_rX0__j8',
	secure: true,
});

describe('Pruebas en fileUpload', () => {
	test('Debe de subir el archivo correctamente a cloudinary', async () => {
		const imageUrl =
			'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw';
		const resp = await fetch(imageUrl);
		const blob = await resp.blob();
		const file = new File([blob], 'photo.jpg');
		const url = await fileUpload(file);
		expect(typeof url).toBe('string');
		// console.log(url);
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.jpg', '');
		// console.log({imageId});
		const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
			resource_type: 'image',
		});
		// console.log(cloudResp);
	});

	test('Debe de retornal null', async () => {
		const file = new File([], 'photo.jpg');
		const url = await fileUpload(file);
		expect(url).toBe(null);
	});
});
