import mongoose from 'mongoose'
import { MONGODB_URI } from '$env/static/private'

const clientOptions: mongoose.ConnectOptions = {
	serverApi: { version: '1', strict: true, deprecationErrors: true }
}

export const connectDB = async () => {
	try {
		if (!mongoose.connection.readyState || mongoose.connection.readyState === 99) {
			await mongoose.connect(MONGODB_URI, clientOptions)
		}
	} catch (e) {
		console.error('Error while connecting to database', e)
	}
}

export const BuildingSchema = mongoose.model(
	'Building',
	new mongoose.Schema(
		{
			id: { type: Number, required: true, unique: true },
			location: {
				type: {
					coordinates: { type: [Number] }
				},
				required: true
			},
			name: { type: String, required: true, unique: true },
			address: { type: String, required: true, unique: true },
			construction_year: { type: Number, required: true },
			type_of_user: {
				type: String,
				enum: ['residential', 'industrial', 'commercial', 'educational', 'recreational']
			},
			tags: {
				type: {
					en: { type: [String] },
					nl: { type: [String] }
				},
				required: true
			},
			description: { type: String },
			image_urls: {
				type: [
					{
						url: { type: String },
						source: { type: String },
						year: { type: Number },
						is_main: { type: Boolean }
					}
				]
			},
			timeline: { type: [String] },
			active: { type: Boolean, default: false },
			audioguids: { type: [String] }
		},
		{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
	)
)
