<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { onMount } from 'svelte';
	import Papa from 'papaparse';
	export let data = [];
	let postcode = '';
	let Hnumber = '';
	let coordinate1 = ''; // example coordinate1
	let coordinate2 = ''; // example coordinate2
	let error = null;
	let openedDetails = 'anno';

	onMount(() => {
		const details = document.querySelectorAll('details');

		details.forEach((targetDetail) => {
			targetDetail.addEventListener('click', () => {
				details.forEach((detail) => {
					if (detail !== targetDetail) {
						detail.removeAttribute('open');
					}
				});
			});
		});
	});

	async function fetchApiData(inputData) {
		try {
			const response = await fetch(
				`/api/bag?postcode=${inputData.postcode}&huisnummer=${inputData.huisnummer}&page=1&pageSize=20`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
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
				form.classList.remove('invalid');
				if (form) {
					for (const [key, value] of Object.entries(data)) {
						const fields = form.querySelectorAll(`[name="${key}"]`);
						fields.forEach((field) => {
							field.value = value;
						});
					}
					const cordsBAG = data.adresseerbaarObjectGeometrie.punt.coordinates;

					processCords(cordsBAG);

					// Combine specific fields and set to another field
					const naam = data.korteNaam || '';
					const huisnummer = data.huisnummer || '';
					const adresField = form.querySelector('[name="Adres"]');
					// const oorspronkelijkBouwjaar = data.oorspronkelijkBouwjaar[0] || "";
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
					} else {
						// logFormData();/
					}
				}
			} else {
				const form = document.querySelector('#Buildings');
				console.log('No match found');
				form.classList.add('invalid');
			}
		}
	}

</script>

<form id="Buildings">
	<details open={openedDetails === 'anno'}>
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
				<div class="maps"></div>
				<!-- Map incoming -->
			</fieldset>
		</div>
	</details>
	<details open={openedDetails === 'details'}>
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
					Gebruiksdoel [select van maken]
					<input id="typeOfUse" name="Gebruiksdoel" type="text" />
				</label>

				<label for="tags">
					Tags [select + checkbox van maken]
					<input id="tags" name="tags" type="text" />
				</label>

				<label for="description">
					Omschrijving
					<textarea cols="50" id="description" name="description" rows="4"></textarea>
				</label>
			</fieldset>
		</div>
	</details>

	<details open={openedDetails === 'img'}>
		<summary><h2>Afbeeldingen</h2></summary>
		<div class="step-content">
			<!-- Question 5 -->
			<fieldset class="img" form="Buildings">
				<div>
					<label for="image">
						Upload afbeeldingen van het gebouw
						<input accept="image/png image/jpeg" id="image" name="image" required type="file" />
					</label>

					<LinkButton
						cta={false}
						href="https://archief.amsterdam/beeldbank/"
						size="large"
						subtle={true}
						>Bekijk de beeldbank
					</LinkButton>
				</div>
				<ul>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
					<li>
						<img alt="ete" src="favicon.png" />
					</li>
				</ul>
			</fieldset>
		</div>
	</details>

	<details open={openedDetails === 'timeline'}>
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

	<details open={openedDetails === 'sum'}>
		<summary><h2>Overzicht</h2></summary>
		<div class="step-content">
			<!-- Review/Summary Part -->
			<p>Include a review or summary of the process here...</p>
			<button type="submit">Submit</button>
		</div>
	</details>

	<!--		Hidden inputs       -->
	<div class="hidden">
		<input id="Nummeraanduidingidentificatie" name="Nummeraanduidingidentificatie" type="text" />
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

		details[open] > summary {
			background-color: var(--primary-color);
			color: var(--text-color-inverse);
			border-color: var(--primary-color);
		}

		details {
			margin-bottom: 1.5rem;
			background-image: none;
			grid-row: 1 / 2;
			height: 100%;
			position: relative;
			left: 0;

			&:has(fieldset:valid) > summary {
				background-color: var(--primary-color);
				color: var(--text-color-inverse);
				border-color: var(--primary-color);
			}

			&:has(fieldset:valid) > summary:after {
				content: '  ✓';
				position: absolute;
				object-fit: contain;
				width: 1.4rem;
				right: 10%;
				background-image: radial-gradient(
					circle,
					transparent 48%,
					var(--text-color-inverse) 49%,
					transparent 52%
				);
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
			}

			h2 {
				margin: 0;
				font-size: 1.2rem;
				font-weight: bold;

				cursor: pointer;
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
							height: 100%;
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
							grid-row: 1 / 15;
						}
					}

					&.img {
						div:first-of-type {
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

								&:hover {
									background-color: var(--secondary-color);
								}

								input {
									display: none;
								}
							}
						}

						ul {
							width: 100%;
							height: 60%;
							list-style: none;
							display: flex;
							justify-content: space-evenly;
							align-items: center;

							li {
								img {
									max-width: 50vw;
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
					}

					label > input {
						display: flex;
						width: 100%;
						height: 2.5rem;
						border: 1px solid var(--border-form-color);
						border-radius: 0.25rem;
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
