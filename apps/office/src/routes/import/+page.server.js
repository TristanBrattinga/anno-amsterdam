import { redirect } from '@sveltejs/kit';
import { api, imageApi } from '$lib/server';
import { parseAndTransformData, createTimeline } from '$lib/utils';

export const actions = {
    create: async (event) => {
        let form_input = await event.request.formData();
        const jsonData = Object.fromEntries(form_input.entries());
        const transformedData = parseAndTransformData(jsonData);
        const file = form_input.get('image');
        if (file) {
            const handleImageUrl = await handleUploadImage(file)
            transformedData.image_urls = [
                {
                    url: handleImageUrl,
                    source: form_input.get('imgSource') || '',
                    description: form_input.get('imgDescription') || '',
                    alt: form_input.get('imgAlt') || '',
                    year: form_input.get('imgYear') || '',
                    is_main: form_input.get('isMain') === 'on' || false,
                }
            ];
        }


        transformedData.timeline = createTimeline(jsonData);

        let newBuilding = null;
        try {
            newBuilding = await api.createBuilding(transformedData);

        } catch (e) {
            console.error(e);
            }
            if (newBuilding) {
                throw redirect(303, `/import/${newBuilding.id}`);
            }
    },
    update: async (event) => {
        console.log('test')
        let form_input = await event.request.formData();
        const jsonData = Object.fromEntries(form_input.entries());
        const transformedData = parseAndTransformData(jsonData);
        const file = form_input.get('image');
        if (file) {
            const handleImageUrl = await handleUploadImage(file)
            transformedData.image_urls = [
                {
                    url: handleImageUrl,
                    source: form_input.get('imgSource') || '',
                    description: form_input.get('imgDescription') || '',
                    alt: form_input.get('imgAlt') || '',
                    year: form_input.get('imgYear') || '',
                    is_main: form_input.get('isMain') === 'on' || false,
                }
            ];
        }

        transformedData.timeline = createTimeline(jsonData);

        let newBuilding = null;
        let id = jsonData.id;
        try {
            newBuilding = await api.updateBuilding(id, transformedData);

        } catch (e) {
            console.error(e);
        }
        if (newBuilding) {
throw redirect(303, `/import/${newBuilding.id}`);
        }

    }
};

async function handleUploadImage(file) {
    const image = await imageApi.uploadImage(file);
    return image.url;
}


