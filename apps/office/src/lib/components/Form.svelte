<script>
	import LinkButton from '$lib/components/LinkButton.svelte';
	import {onMount} from 'svelte';
	import Papa from 'papaparse';
	
	export let data = [];
	let postcode = '';
	let Hnumber = '';
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
			async function fetchData() {
				try {
					const response = await fetch('data/bag-database.csv');
					const csvText = await response.text();
					
					Papa.parse(csvText, {
						header: true,
						complete: function (results) {
							data = results.data;
						},
						error: function (error) {
							console.error('Error parsing CSV:', error);
						}
					});
				} catch (error) {
					console.error('Error fetching CSV:', error);
				}
			}
			
			// Fetch data when the component is mounted
			fetchData();
			
			
		});
	function checkInputs() {
		
		const trimmedPostcode = String(postcode).trim();
		const trimmedHnumber = String(Hnumber).trim();
		
		
		
		if (trimmedPostcode && trimmedHnumber) {
			const match = data.find(item => item.Postcode === trimmedPostcode.toUpperCase() && item.Huisnummer === trimmedHnumber);
			
			if (match) {
				const form = document.querySelector('#Buildings');
				form.classList.remove('invalid');
				if (form) {
					for (const [key, value] of Object.entries(match)) {
						const fields = form.querySelectorAll(`[name="${key}"]`);
						fields.forEach(field => {
							field.value = value;
						});
					}
					
					// Combine specific fields and set to another field
					const naam = match.Naam || '';
					const huisnummer = match.Huisnummer || '';
					const adresField = form.querySelector('[name="Adres"]');
					const constYearFirst = form.querySelector('[id="constYearFirst"]');
					if (adresField) {
						adresField.value = `${naam} ${huisnummer}`.trim();
					}
					if (constYearFirst && constYearFirst.value === '') {
						constYearFirst.removeAttribute('disabled');
					}
					constYearFirst.addEventListener('blur', fillConstYear);
					function fillConstYear(){
						const constYearField = form.querySelector('[id="constYear"]');
						if (constYearField) {
							constYearField.value = constYearFirst.value;
						}
					}
				}
			}else {
				const form = document.querySelector('#Buildings');
				console.log('No match found')
				form.classList.add('invalid');
			}
		}
	}
	
	
</script>

<form id="Buildings">
  
  <details open>
    <summary><h2>ANNO</h2></summary>
    <div class="step-content">
      <!-- Question 1 -->
      <fieldset form="Buildings">
	      
	      
	      <div>
          <label for="longtitute">
            Longitude:
            <input id="longtitute"
                   name="Longitude"
                   required
                   readonly
                   type="text">
          </label>
		      
		      <!-- Question 2 -->
          <label for="latitute">
            Latitude:
            <input id="latitute"
                   name="Latitude"
                   required
                   readonly
                   type="text"
                   >
          </label>
        </div>
	      
	      <!-- Question 3 -->
        <div>
	        <label for="postcode" >
            Postcode:
            <input id="postcode"
                   name="postcode"
                   required
                   type="text"
                   bind:value={postcode}
                   on:blur={checkInputs}
                   >
          </label>
	        
	        <!-- Question 4 -->
          <label for="Hnumber" >
            Huisnummer:
            <input id="Hnumber"
                   name="Huisnummer"
                   required
                   type="text"
                   bind:value={Hnumber}
                   on:blur={checkInputs}
                    >
          </label>
	        </div>
	      <div>
	        <!-- Question 5 -->
          <label for="street">
            Straat:
            <input id="street"
                   name="Naam"
                   required
                   disabled
                   type="text">
          </label>
	        
	        <!-- Question 6 -->
	        <label class="tiny"
	               for="constYearFirst">
          Bouwjaar:
          <input id="constYearFirst"
                 name="Oorspronkelijk_bouwjaar"
                 required
                 disabled
                 type="number"
                 >
          </label>
        </div>
	      
	      <!-- Map incoming -->
        <div class="maps"></div>
      </fieldset>
    </div>
  </details>

  <details>
    <summary><h2>Details</h2></summary>
    <div class="step-content">
      <!-- Question 6 -->
      <fieldset form="Buildings">
	      <div>
        <label for="address">
          Adres
          <input id="address"
                 name="Adres"
                 required
                 disabled
                 type="text">
        </label>
		      
		      <!-- Question 7 -->
        <label for="name">
          Naam (evt. in plaats van adres)
          <input id="name"
                 name="Naam"
                 required
                 type="text">
        </label>
		      <!-- Question 8 -->
        <label for="constYear" class="tiny">
          Bouwjaar
          <input id="constYear"
                 name="Oorspronkelijk_bouwjaar"
                 required
                 type="text">
        </label>
		      </div>
	      <div>
	      <!-- Question 10 -->
        <label for="typeOfUse" >
          Gebruik (?) [select van maken]
          <input id="typeOfUse"
                 name="Gebruiksdoel"
                 type="text">
        </label>
	      <!-- Question 11 -->
        <label for="tags">
          Tags (?) [select + checkbox van maken]
          <input id="tags"
                 name="tags"
                 type="text">
        </label>
		      </div>
	      <!-- Question 12 -->
        <label for="description">
          Omschrijving
          <textarea cols="50"
                    id="description"
                    name="description"
                    rows="4"></textarea>
        </label>
      </fieldset>
    </div>
  </details>

  <details>
    <summary><h2>Afbeeldingen</h2></summary>
    <div class="step-content">
      <!-- Question 5 -->
      <fieldset form="Buildings">
	      <div>
        <label for="image">
          Upload afbeeldingen van het gebouw
          <input accept="image/png image/jpeg"
                 id="image"
                 name="image"
                 required
                 type="file"
          >
        </label>
	      
	      <LinkButton cta={false}
	                  href="https://archief.amsterdam/beeldbank/"
	                  size="large"
	                  subtle={true}>Bekijk de beeldbank</LinkButton>
	      </div>
      </fieldset>
    </div>
  </details>

  <details>
    <summary><h2>Tijdlijn</h2></summary>
    <div class="step-content">
      <!-- Question 7 -->
      <fieldset form="Buildings">
        <label for="color">
          Favorite Color:
          <input id="color"
                 name="color"
                 required
                 type="text">
        </label>
	      
	      <!-- Question 8 -->
        <label for="food">
          Favorite Food:
          <input id="food"
                 name="food"
                 required
                 type="text">
        </label>
      </fieldset>
    </div>
  </details>

  <details>
    <summary><h2>Overzicht</h2></summary>
    <div class="step-content">
      <!-- Review/Summary Part -->
      <p>Include a review or summary of the process here...</p>
      <button type="submit">Submit</button>
    </div>
  </details>
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
	  
	  &.invalid {
		  details{
			  .step-content{
				  #postcode, #Hnumber{
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
			  content: "  ✓";
			  position: absolute;
			  object-fit: contain;
			  width: 1.4rem;
			  right: 10%;
			  background-image: radial-gradient(circle, transparent 48%, var(--text-color-inverse) 49%, transparent 52%);;
			  color: var(--text-color-inverse);
			  font-size: 1.5rem;
		  }
		  
		  @for $i from 1 through 5 {
			  &:nth-of-type(#{$i}) .step-content {
				  left: calc((-95vw / 5) * (#{$i} - 1));
			  }
			  &:first-of-type summary {
				  border-radius: 0.25rem 0 0 .25rem;
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
			  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
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
				  margin-top: .5rem;
				  background-color: var(--border-color);
				  display: flex;
				  flex-direction: column;
				  gap: 2rem;
				  height: calc(100% - 2rem);
				  
				  div {
					  display: flex;
					  justify-content: space-between;
					  gap: 1.5rem;
				  }
				  label{
					  flex-grow: 1;
					  flex-basis: 2em;
				  }
				  label.tiny{
					  flex-grow: .385;
				  }
				  
				  
				  label > input {
					  display: flex;
					  width: 100%;
					  height: 2.5rem;
					  border: 1px solid var(--border-form-color);
					  border-radius: .25rem;
				  }
				  
				  label > input:required{
					  border: 1px solid var(--primary-color);
				  }
				  label > input:disabled, label > input:read-only{
					  border: 1px solid var(--border-form-color);
				  }
				  label > textarea {
					  display: flex;
					  width: 100%;
					  height: 60%;
					  border-radius: .25rem;
					  border: 1px solid var(--border-form-color);
				  }
				  
				  .maps {
					  width: 100%;
					  height: 70%;
					  background: var(--disabled-color);
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