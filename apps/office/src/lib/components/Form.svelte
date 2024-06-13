<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import {PUBLIC_MAPBOX_KEY} from "$env/static/public";
	import { onMount } from 'svelte';
	import Papa from 'papaparse';
	export let data;
	let postcode = '';
	let Hnumber = '';
	let status = '';
	let coordinate1 = ''; // example coordinate1
	let coordinate2 = ''; // example coordinate2
	let error = null;

	onMount(() => {
		const iframe = document.querySelector('iframe');
		iframe.src = `https://api.mapbox.com/styles/v1/tristanbrattinga/clwtovfzh00or01poa3mo6ljg.html?title=false&access_token=${PUBLIC_MAPBOX_KEY}&zoomwheel=false#12.12/52.36923/4.89499`;
	});

	let images = [];

	// Function to handle file input change event
	function handleFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			const src = URL.createObjectURL(file);
			images = [...images, { src, isMain: false }];
		}
	}



	async function fetchApiData(inputData) {
		try {
			const response = await fetch(
				`/api/bag?postcode=${inputData.postcode}&huisnummer=${inputData.huisnummer}&page=1&pageSize=20`
			);
			if (!response.ok) {
				status = 'invalid';
				checkStatus();
				throw new Error('Failed to fetch data');
			}
			status = '';
			const responseData = await response.json();
			console.log(`${JSON.stringify(responseData)} is data`);
			return responseData;
		} catch (err) {

			error = err.message;
			console.error('Error:', error);
			return [];
		}
	}

	async function fetchProxyData(cords) {
		try {
			const response = await fetch(
				`/api/proxy?coordinate1=${cords.coordinate1}&coordinate2=${cords.coordinate2}&format=text`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch data');

			}
			const responseData = await response.text();
			console.log(responseData);

			// Extract WGS84 coordinates from the plain text response
			const wgs84Match = responseData.match(/WGS84\(E,N\):\s*([\d.]+),\s*([\d.]+)/);
			if (wgs84Match) {
				const latitude = parseFloat(wgs84Match[1]);
				const longitude = parseFloat(wgs84Match[2]);
				const wgs84Coords = { latitude, longitude };
				console.log(wgs84Coords, 'is wgs84Coords');
				return wgs84Coords;
			} else {
				throw new Error('Failed to parse WGS84 coordinates');
			}
		} catch (err) {
			error = err.message;
			console.error('Error:', error);
			return null;
		}
	}

	function processCords(cordsBAG) {
		const cords = {
			coordinate1: cordsBAG[0],
			coordinate2: cordsBAG[1]
		};
		console.log(cords);
		fetchProxyData(cords).then((coordsData) => {
			console.log('Fetched WGS84 coordinates:', coordsData);
			if (coordsData) {
				const form = document.querySelector('#Buildings');
				const longtitute = form.querySelector('[name="Longitude"]');
				const latitute = form.querySelector('[name="Latitude"]');
				if (longtitute && latitute) {
					longtitute.value = coordsData.longitude;
					latitute.value = coordsData.latitude;
					const iframe = document.querySelector('iframe');
					iframe.src = `https://api.mapbox.com/styles/v1/tristanbrattinga/clwtovfzh00or01poa3mo6ljg.html?title=false&access_token=${PUBLIC_MAPBOX_KEY}&zoomwheel=false#16.12/${coordsData.latitude}/${coordsData.longitude}`;
				}
			}
		});
	}
	async function checkInputs() {

		const trimmedPostcode = String(postcode).trim();
		const trimmedHnumber = String(Hnumber).trim();

		if (trimmedPostcode && trimmedHnumber) {
			const inputData = {
				postcode: trimmedPostcode,
				huisnummer: trimmedHnumber
			};

			data = await fetchApiData(inputData); // Await the API call
			console.log(data, 'is data');

			if (data) {
				const form = document.querySelector('#Buildings');
				if (form) {
					for (const [key, value] of Object.entries(data)) {
						const fields = form.querySelectorAll(`[name="${key}"]`);
						fields.forEach((field) => {
							field.value = value;
						});
					}
					const cordsBAG = data.adresseerbaarObjectGeometrie.punt.coordinates;
					checkStatus();
					processCords(cordsBAG);

					// Combine specific fields and set to another field
					const naam = data.korteNaam || '';
					const huisnummer = data.huisnummer || '';
					const adresField = form.querySelector('[name="Adres"]');

					const typeOfUseField = form.querySelector('select[id="typeOfUse"]');
					typeOfUseField.value = data.gebruiksdoelen[0];

					const constYearFirst = form.querySelector('[id="constYearFirst"]');
					if (adresField) {
						adresField.value = `${naam} ${huisnummer}`.trim();
					}
					if (constYearFirst && constYearFirst.value === '') {
						constYearFirst.removeAttribute('readonly');
						constYearFirst.addEventListener('blur', fillConstYear);

						const constYearField = form.querySelector('[id="constYear"]');
						if (constYearFirst.value) {
							constYearField.value = constYearFirst.value;
						}
					}

				}
			}

		}
	}
	async function createBuilding(event) {
		const form = document.querySelector("#Buildings");
		const formData = new FormData(form);
		const jsonData = Object.fromEntries(formData.entries());
		console.log("Form data:", jsonData);
		try {
			const response = await fetch('/api/log', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			});

			if (response.ok) {
				console.log("Form data logged successfully");
				location.href = `/import/${jsonData.nummeraanduidingIdentificatie}`;
			} else {
				console.error("Failed to log form data");
			}
		} catch (error) {
			console.error("Error logging form data:", error);
		}
	}

	function checkStatus(){
		const form = document.querySelector('#Buildings');
		console.log(status);
		if (status === 'invalid') {
			form.classList.add('invalid');
		} else {
			form.classList.remove('invalid');
		}

	}
</script>

<form id="Buildings">
	<details open name="buildings">
		<summary><h2>ANNO</h2></summary>
		<div class="step-content">
			<fieldset class="ANNO" form="Buildings">
				<div>
					<label for="postcode">
						Postcode:
						<input
							bind:value={postcode}
							id="postcode"
							name="postcode"
							on:blur={checkInputs}
							required
							type="text"
						/>
					</label>
					<label for="Hnumber">
						Huisnummer:
						<input
							bind:value={Hnumber}
							id="Hnumber"
							name="Huisnummer"
							on:blur={checkInputs}
							required
							type="text"
						/>
					</label>
					<label for="constYearFirst">
						Bouwjaar:
						<input
							id="constYearFirst"
							name="oorspronkelijkBouwjaar"
							readonly
							required
							type="number"
						/>
					</label>
				</div>
				<div>
					<label for="street">
						Straat:
						<input id="street" name="korteNaam" readonly required type="text" />
					</label>
				</div>
				<div>
					<label for="longtitute">
						Longitude:
						<input id="longtitute" name="Longitude" readonly required type="text" />
					</label>
					<label for="latitute">
						Latitude:
						<input id="latitute" name="Latitude" readonly required type="text" />
					</label>
				</div>
				<div class="maps">
					<iframe width='100%' height='400px' title="Untitled" style="border:none;"></iframe>
				</div>
				<input type="submit" value="Maak gebouw aan" on:click={createBuilding}>
			</fieldset>
		</div>
	</details>
	<details name="buildings">
		<summary><h2>Details</h2></summary>
		<div class="step-content">
			<fieldset class="details" form="Buildings">
				<label for="address">
					Adres
					<input id="address" name="Adres" readonly required type="text" />
				</label>
				<div>
					<label for="name">
						Naam
						<input id="name" name="korteNaam" required type="text" />
					</label>
					<label for="constYear">
						Bouwjaar
						<input id="constYear" name="oorspronkelijkBouwjaar" required type="text" />
					</label>
				</div>

				<label for="typeOfUse">
					Gebruiksdoel
					<select id="typeOfUse" value="overige gebruiksfunctie">
						<option value="woonfunctie">Woonfunctie</option>
						<option value="kantoorfunctie">Kantoorfunctie</option>
						<option value="bijeenkomstfunctie">Bijeenkomstfunctie</option>
						<option value="recreatiefunctie">Recreatiefunctie</option>
						<option value="onderwijsfunctie">Onderwijsfunctie</option>
						<option value="industriefunctie">Industriefunctie</option>
						<option value="overige gebruiksfunctie">Overige gebruiksfunctie</option>
					</select>
				</label>


				<label for="tags">
					Tags<!--TODO : add tags search, add, remove and select and make it nice -->

					<input id="tags" name="tags" type="text" />
				</label>

				<label for="description">
					Omschrijving
					<textarea cols="50" id="description" name="description" rows="3"></textarea>
				</label>
			</fieldset>
		</div>
	</details>

	<details name="buildings">
		<summary><h2>Afbeeldingen</h2></summary>
		<div class="step-content">
			<!-- Question 5 -->
			<fieldset class="img" form="Buildings">
				<div>
					<label for="image">
						Upload afbeeldingen van het gebouw
						<input
								accept="image/png image/jpeg"
								id="image"
								name="image"
								on:change={handleFileChange}
								required
								type="file"
								class="hidden"
						/>
					</label>

					<LinkButton
						cta={false}
						href="https://archief.amsterdam/beeldbank/"
						size="large"
						subtle={true}
						>Bekijk de beeldbank
					</LinkButton>
				</div>
				<ul id="output">
					{#each images as image, index}
						<li>
							<div>
							<img src={image.src} alt={`Image ${index}`} />
							</div>
							<label for={`isImgMain-${index}`}>
								<input
										id={`isImgMain-${index}`}
										type="radio"
										name="isMain"
										checked={image.isMain}
										class="hidden"
										on:change={() => handleRadioChange(index)}
								/>
							</label>
							<label for="imgDescription">
								Omschrijving
								<textarea
										id="imgDescription"
										name="imgDescription"
										required
										rows="3"
								></textarea>
							</label>
							<div>
							<label for="imgSource">
								Bron
								<input
										id="imgSource"
										name="imgSource"
										required
										type="text"
								/>
							</label>
							<label for="imgYear">
								Jaar
								<input
										id="imgYear"
										name="imgYear"
										required
										type="number"
								/>
							</label>
							</div>
						</li>
					{/each}
				</ul>
			</fieldset>
		</div>
	</details>

	<details name="buildings">
		<summary><h2>Tijdlijn</h2></summary>
		<div class="step-content">
			<!-- Question 7 -->
			<fieldset form="Buildings">
				<label for="color">
					Favorite Color:
					<input id="color" name="color" required type="text" />
				</label>

				<!-- Question 8 -->
				<label for="food">
					Favorite Food:
					<input id="food" name="food" required type="text" />
				</label>
			</fieldset>
		</div>
	</details>

	<details name="buildings">
		<summary><h2>Overzicht</h2></summary>
		<div class="step-content">
			<!-- Review/Summary Part -->
			<p>Include a review or summary of the process here...</p>
			<button type="submit">Submit</button>
		</div>
	</details>

	<!--		Hidden inputs       -->
	<div class="hidden">
		<input id="nummeraanduidingIdentificatie" name="nummeraanduidingIdentificatie" type="text" />
	</div>
</form>

<style lang="scss">
	form {
		position: relative;
		width: 100%;
		height: 70vh;
		display: grid;
		//background: #3b3b3b;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 12fr;
		//background: red;

		.hidden {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}

		&.invalid {
			details {
				.step-content {
					#postcode,
					#Hnumber {
						background-color: var(--error-color);
						color: var(--text-color-inverse);
						border: 1px solid var(--error-color);
					}
				}
			}
		}



		details {
			margin-bottom: 1.5rem;
			background-image: none;
			grid-row: 1 / 2;
			height: 100%;
			position: relative;
			left: 0;
			&[open] > summary{
				pointer-events: none;

			}
			&:has(fieldset:valid) > summary {
				background-color: var(--primary-color);
				color: var(--text-color-inverse);
				border-color: var(--primary-color);
			}
			&:has(fieldset:valid)[open] > summary h2::before {
			background-color: var(--text-color-inverse);
			}
			&[open] > summary h2::before {
				content: '';
				padding: 0 1rem;
				position: absolute;
				left: 0;
				bottom: -25%;
				width: 100%;
				height: .2rem;
				background-color: var(--primary-color);
				background-size: 99%;
				background-position: top center;

				background-position: top left;
				color: var(--text-color-inverse);
				font-size: 1.5rem;
			}

			&:has(fieldset:valid) > summary::after {
				content: '✓';
				padding: 0 1rem;
				position: absolute;
				right: 10%;
				width: 3rem;
				background-image: radial-gradient(
								circle,
								transparent 45%,
								var(--text-color-inverse) 46%,
								var(--text-color-inverse) 54%,
								transparent 55%
				);
				background-size: 99%;
				background-position: top center;

				background-position: top left;
				color: var(--text-color-inverse);
				font-size: 1.5rem;
			}

			@for $i from 1 through 5 {
				&:nth-of-type(#{$i}) .step-content {
					left: calc((-95vw / 5) * (#{$i} - 1));
				}
				&:first-of-type summary {
					border-radius: 0.25rem 0 0 0.25rem;
					border-left: 1px solid var(--primary-color);
				}
				&:last-of-type summary {
					border-radius: 0 0.25rem 0.25rem 0;
					border-right: 1px solid var(--primary-color);
				}
			}

			summary {
				list-style: none;
				position: absolute;
				left: 0;
				height: calc(75vh * 1 / 12);
				margin: 0;
				width: calc(95vw / 5);
				cursor: pointer;
				font-size: 1.2rem;
				font-weight: bold;
				color: var(--text-color);
				padding: 0.5rem 1rem;
				border-bottom: 1px solid var(--primary-color);
				border-top: 1px solid var(--primary-color);
				transition:
					background-color 0.15s,
					border-color 0.15s,
					color 0.15s;
				display: flex;
				justify-content: center;
				align-items: center;

				-moz-user-select: none; /* Old versions of Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
				-webkit-user-select: none; /* Safari */
				user-select: none;
				h2 {
					margin: 0;
					font-size: 1.2rem;
					font-weight: bold;
					position: relative;
					cursor: pointer;
				}
			}




			.step-content {
				position: absolute;
				width: 95vw;
				height: calc(70vh * 11 / 12);
				left: 0;
				bottom: calc(-70vh * (11 / 12) - 1vh);
				border-radius: 0.25rem;
				grid-row: 2 / -1;
				grid-column: 1 / -1;

				fieldset {
					border-radius: 0.25rem;
					width: 100%;
					padding: 2rem 3rem 1rem;
					margin-top: 0.5rem;
					background-color: var(--border-color);
					display: flex;
					flex-direction: column;
					gap: 2rem;
					height: calc(90% - 2rem);

					&.ANNO {
						display: grid;
						grid-template-columns: 1fr 1fr;

						> div:nth-last-of-type(2) {
							flex-direction: column;
							width: 50%;
						}

						div.maps {
							width: 100%;
							height: 70%;
							background: var(--disabled-color);
							grid-column: 2 / -1;
							grid-row: 1 / 10;
						}
					}

					&.details {
						display: grid;
						grid-template-columns: 1fr 1fr;

						div {
							label:first-of-type {
								flex-grow: 1;
							}

							label:last-of-type {
								flex-grow: 0.2;
							}
						}

						> label:last-of-type {
							width: 100%;
							height: 100%;
							grid-column: 2 / -1;
							grid-row: 1 / 11;
						}
					}

					&.img {
						height: fit-content;
						min-height: calc(70vh * 11 / 12);

						> div:first-of-type {
							label {
								flex-grow: 0.25;
								min-width: fit-content;
								padding: 0.25rem 0.75rem;
								background-color: var(--primary-color);
								border-radius: 0.25rem;
								color: var(--text-color-inverse);
								display: flex;
								justify-content: center;
								align-items: center;
								cursor: pointer;
								transition: .2s;
								&:hover {
									background-color: var(--secondary-color);
								}
								&:focus{
									border: 1px solid var(--border-form-color);
								}
							}
						}


						#output {
							width: 100%;
							height: 60%;
							list-style-type: none;
							display: flex;
							justify-content: flex-start;
							flex-wrap: wrap;
							gap: 10rem;
							align-items: center;


							li {
								width: 25%;
								display: flex;
								flex-direction: column;
								div:first-of-type{
									min-height: 33vh;
									max-height: 40vh;
									overflow: hidden;
									//object-fit: contain;
									display: flex;
									align-items: center;
									border: 1px solid var(--border-form-color);
									img {
										width: 100%;
										object-fit: contain;
										height: 100%;
									}
								}
								label:has(input[type='radio']) {
									padding: 0.5rem 0.75rem;
									width: 2rem;
									border: none;
									border-radius: 0.25rem;
									cursor: pointer;
									background-color: var(--primary-color);

								}
								label:has(input[type='radio']:checked) {
									background-color: var(--secondary-color);
								}

							}
						}
					}

					div {
						display: flex;
						justify-content: space-between;
						gap: 1.5rem;
					}

					label {
						flex-grow: 1;
						flex-basis: 2em;
						margin: .25rem .25rem;
					}

					label > input, label > select{
						display: flex;
						width: 100%;
						height: 2.5rem;
						border: 1px solid var(--border-form-color);
						border-radius: 0.25rem;
					}


					label input[type='submit'],
					input[type='submit']{
						position: absolute;
						bottom: 1rem;
						right: 3.5rem;
						padding: 0.5rem 0.75rem;
						border: none;
						border-radius: 0.25rem;
						cursor: pointer;
						font-size: clamp(1rem, 1vw, 1.1rem);
						transition: .15s;
						background-color: var(--primary-color);
						color: white;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					input[type='submit']:hover{
						background-color: var(--secondary-color);
					}
					label > input:required {
						border: 1px solid var(--primary-color);
					}

					label > input:disabled,
					label > input:read-only {
						border: 1px solid var(--border-form-color);
						background-color: rgb(239, 239, 239, 0.3);
					}

					label > textarea {
						display: flex;
						width: 100%;
						height: 70%;
						border-radius: 0.25rem;
						border: 1px solid var(--border-form-color);
					}

					p {
						margin: 0;
						font-size: 1rem;
						color: var(--text-color);

						&:first-child {
							margin-top: 0;
						}

						&:last-child {
							margin-bottom: 0;
						}
					}

					details summary::-webkit-details-marker {
						display: none;
					}

					details summary {
						list-style: none;
						margin: 0;
						cursor: pointer;

						&:focus {
							outline: none;
						}

						&::-moz-focus-inner {
							border: 0;
						}
					}
				}
			}
		}
	}
</style>
