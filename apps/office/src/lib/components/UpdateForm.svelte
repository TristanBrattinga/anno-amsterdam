<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import { onMount } from 'svelte';

	let openedDetails = 'details';
	export let data;
	let matchData = data.match;
	let ownData = data.ownMatch;

	console.log(data);

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

		if (matchData && ownData) {
			const form = document.querySelector('#Buildings');
			const dataTransformed = {
				Nummeraanduidingidentificatie: matchData.Nummeraanduidingidentificatie,
				Postcode: matchData.Postcode,
				Huisnummer: matchData.Huisnummer,
				Naam: matchData.Naam,
				Adres: ownData.address,
				Oorspronkelijk_bouwjaar: ownData.construction_year,
				Gebruiksdoel: ownData.type_of_use,
				tags: ownData.tags,
				description: ownData.description,
				Longitude: matchData.Longitude,
				Latitude: matchData.Latitude
			};
			console.log(dataTransformed);
			if (form) {
				for (const [key, value] of Object.entries(dataTransformed)) {
					const fields = form.querySelectorAll(`[name="${key}"]`);
					fields.forEach((field) => {
						if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
							field.value = value;
						}
					});
				}
			}
		}
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

	// Function to handle radio button change event
	function handleRadioChange(index) {
		images = images.map((img, i) => ({ ...img, isMain: i === index }));
	}

	// function loadFile(event) {
	// 		const output = document.getElementById('output');
	// 		const outputLi = document.createElement('li');
	// 		const outputLiLabel = document.createElement('label');
	// 		outputLiLabel.setAttribute('for', 'isImgMain');
	// 		const outputLiLabelInput = document.createElement('input');
	// 		outputLiLabelInput.setAttribute('id', 'imgIsMain');
	// 		outputLiLabelInput.setAttribute('type', 'radio');
	// 		const outputLiLabelImg = document.createElement('img');
	// 		outputLiLabelImg.src = URL.createObjectURL(event.target.files[0]);
	// 		outputLiLabel.appendChild(outputLiLabelInput);
	// 		outputLiLabel.appendChild(outputLiLabelImg);
	// 		outputLi.appendChild(outputLiLabel);
	//
	//
	// 		outputLi.style = "width:20%;";
	// 		outputLiLabelInput.style = "display: none";
	// 		outputLiLabel.style = "padding: 0.5rem 0.75rem; width:2rem; border: none; border-radius: 0.25rem; cursor: pointer; background-color: var(--primary-color);";
	//
	//
	//
	// 		outputLiLabelImg.style = "width: 100%;";
	// 		output.appendChild(outputLi);
	// 		output.onload = function() {
	// 				URL.revokeObjectURL(outputLiLabelImg.src); // free memory
	// 		};
	// }

	async function updateFormData(event: Event) {
		event.preventDefault();
		const form = document.querySelector('#Buildings') as HTMLFormElement;
		const formData = new FormData(form);
		const jsonData = Object.fromEntries(formData.entries());
		console.log('Form data:', jsonData);

		try {
			const response = await fetch('/api/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			});
			console.log('Response:', response);
			if (response.ok) {
				console.log('Form data logged successfully');
			} else {
				console.error('Failed to log form data');
			}
		} catch (error) {
			console.error('Error logging form data:', error);
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
						<input id="postcode" name="Postcode" readonly required type="text" />
					</label>
					<label for="Hnumber">
						Huisnummer:
						<input id="Hnumber" name="Huisnummer" readonly required type="text" />
					</label>
					<label for="constYearFirst">
						Bouwjaar:
						<input id="constYearFirst" name="Oorspronkelijk_bouwjaar" readonly type="number" />
					</label>
				</div>
				<div>
					<label for="street">
						Straat:
						<input id="street" name="Naam" readonly type="text" />
					</label>
				</div>
				<div>
					<label for="longtitute">
						Longitude:
						<input id="longtitute" name="Longitude" readonly type="text" />
					</label>
					<label for="latitute">
						Latitude:
						<input id="latitute" name="Latitude" readonly type="text" />
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
						<input id="name" name="Naam" required type="text" />
					</label>
					<label for="constYear">
						Bouwjaar
						<input id="constYear" name="Oorspronkelijk_bouwjaar" required type="text" />
					</label>
				</div>

				<label for="typeOfUse">
					Gebruiksdoel [select van maken]
					<input id="typeOfUse" name="Gebruiksdoel" required type="text" />
				</label>

				<label for="tags">
					Tags [select + checkbox van maken]
					<input id="tags" name="tags" type="text" />
				</label>

				<label for="description">
					Omschrijving
					<textarea cols="50" id="description" name="description" required rows="4"></textarea>
				</label>
			</fieldset>
			<label for="Update">
				<input on:click={updateFormData} type="submit" value="Update" />
			</label>
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
						subtle={true}>Bekijk de beeldbank</LinkButton
					>
				</div>
				<ul id="output">
					{#each images as image, index}
						<li>
							<label for={`isImgMain-${index}`}>
								<input
									id={`isImgMain-${index}`}
									type="radio"
									name="isMain"
									checked={image.isMain}
									on:change={() => handleRadioChange(index)}
								/>
								<img src={image.src} alt={`Image ${index}`} />
							</label>
						</li>
					{/each}
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
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: 1fr 12fr;

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
			height: 100%;
			position: relative;
			left: 0;

			&:has(fieldset:valid) > summary {
				background-color: var(--primary-color);
				color: var(--text-color-inverse);
				border-color: var(--primary-color);
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
							justify-content: space-evenly;
							align-items: center;

							li {
								background: red;
								width: 20%;

								label {
									padding: 0.5rem 0.75rem;
									width: 2rem;
									border: none;
									border-radius: 0.25rem;
									cursor: pointer;
									background-color: var(--primary-color);
									img {
										width: 100%;
									}

									input {
										display: none;
									}
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

					label > input,
					label > textarea {
						display: flex;
						width: 100%;
						border-radius: 0.25rem;
						border: 1px solid var(--border-form-color);
					}

					label > input {
						height: 2.5rem;

						&:required {
							border: 1px solid var(--primary-color);
						}

						&:disabled,
						&:read-only {
							background-color: rgb(239, 239, 239, 0.3);
						}
					}

					label input[type='submit'] {
						padding: 0.5rem 0.75rem;
						border: none;
						border-radius: 0.25rem;
						cursor: pointer;
						font-size: clamp(1rem, 1vw, 1.1rem);
						transition:
							background-color 0.15s,
							border-color 0.15s,
							color 0.15s;
						background-color: var(--primary-color);
						color: white;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					label > textarea {
						height: 70%;
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
