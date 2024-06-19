<script>
    import LinkButton from '$lib/components/LinkButton.svelte';
    import Button from '$lib/components/Button.svelte';
    import {PUBLIC_MAPBOX_KEY} from "$env/static/public";
    import {onMount} from 'svelte';

    export let data;
    let postcode = '';
    let Hnumber = '';
    let status = '';
    let coordinate1 = ''; // example coordinate1
    let coordinate2 = ''; // example coordinate2
    let error = null;
    let timelineEntries = [{ year: '', description: '' }];

    // Reactive variables for summary
    let constYearSum = '';
    let AdresSum = '';
    let typeOfUseSum = '';
    let tagsSum = '';
    let descriptionSum = '';
    let bagID = '';

    onMount(() => {
        const iframe = document.querySelector('iframe');
        iframe.src = `https://api.mapbox.com/styles/v1/tristanbrattinga/clwtovfzh00or01poa3mo6ljg.html?title=false&access_token=${PUBLIC_MAPBOX_KEY}&zoomwheel=false#12.12/52.36923/4.89499`;
    });

    let images = [];

    // Function to handle file input change event
    function handleFileChange(event) {
        let form = document.querySelector('#Buildings');
        form.setAttribute('enctype', 'multipart/form-data');
        const file = event.target.files[0];
        if (file) {
            const src = URL.createObjectURL(file);
            images = [...images, {src, isMain: false}];
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

            // Extract WGS84 coordinates from the plain text response
            const wgs84Match = responseData.match(/WGS84\(E,N\):\s*([\d.]+),\s*([\d.]+)/);
            if (wgs84Match) {
                const latitude = parseFloat(wgs84Match[1]);
                const longitude = parseFloat(wgs84Match[2]);
                const wgs84Coords = {latitude, longitude};
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
        fetchProxyData(cords).then((coordsData) => {
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

            if (data) {
                const form = document.querySelector('#Buildings');
                if (form) {
                    for (const [key, value] of Object.entries(data)) {
                        const fields = form.querySelectorAll(`[name="${key}"]`);
                        fields.forEach((field) => {
                            field.value = value;
                            // Create a new 'input' event
                            const event = new Event('input', {
                                bubbles: true,
                                cancelable: true
                            });

                            // Dispatch the 'input' event
                            field.dispatchEvent(event);
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

                    if(typeOfUseField){
                        typeOfUseField.value = data.gebruiksdoelen[0];
                        // Create a new 'input' event
                        const event = new Event('change', {
                            bubbles: true,
                            cancelable: true
                        });
                        // Dispatch the 'change' event
                        typeOfUseField.dispatchEvent(event);
                    }
                    const constYearFirst = form.querySelector('[id="constYearFirst"]');
                    if (adresField) {
                        adresField.value = `${naam} ${huisnummer}`.trim();
                        // Create a new 'input' event
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true
                        });

                        // Dispatch the 'input' event
                        adresField.dispatchEvent(event);
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


    function checkStatus() {
        const form = document.querySelector('#Buildings');
        if (status === 'invalid') {
            form.classList.add('invalid');
        } else {
            form.classList.remove('invalid');
        }

    }
    function addTimelineEntry(event) {
        event.preventDefault();
        const lastEntry = timelineEntries[timelineEntries.length - 1];
        if (lastEntry.year && lastEntry.description) {
            timelineEntries = [...timelineEntries, { year: '', description: '' }];
        }
        else{
            alert('Please fill in the previous entry first');
        }
    }
</script>


<form action="/import?/create" id="Buildings" method="POST">
    <details name="buildings" open>
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
                        <input id="street" name="korteNaam" readonly required type="text" placeholder="&nbsp;"/>
                    </label>
                </div>
                <div>
                    <label for="longtitute">
                        Longitude:
                        <input id="longtitute" name="Longitude" readonly required type="text"/>
                    </label>
                    <label for="latitute">
                        Latitude:
                        <input id="latitute" name="Latitude" readonly required type="text"/>
                    </label>
                </div>
                <div class="maps">
                    <iframe height='400px' style="border:none;" title="Anno Amsterdam Gebouw" width='100%'></iframe>
                </div>
            </fieldset>
        </div>
    </details>
    <details name="buildings" >
        <summary><h2>Details</h2></summary>
        <div class="step-content">
            <fieldset class="details" form="Buildings">
                <label for="address">
                    Adres
                    <input id="address" name="Adres" readonly required type="text" bind:value={AdresSum} placeholder="&nbsp;"/>
                </label>
                <div>
                    <label for="name">
                        Naam
                        <input id="name" name="korteNaam" required type="text"/>
                    </label>
                    <label for="constYear">
                        Bouwjaar
                        <input id="constYear" name="oorspronkelijkBouwjaar" bind:value={constYearSum} required type="number"/>
                    </label>
                </div>

                <label for="typeOfUse">
                    Origineel gebruiksdoel
                    <select id="typeOfUse" bind:value={typeOfUseSum}>
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

                    <input id="tags" bind:value={tagsSum} name="tags" type="text"/>
                </label>

                <label for="description">
                    Omschrijving
                    <textarea cols="50" id="description" bind:value={descriptionSum} name="description" rows="3"></textarea>
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
                                accept="image/*"
                                class="hidden"
                                id="image"
                                name="image"
                                on:change={handleFileChange}
                                type="file"
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
                                <img src={image.src} alt={`Image ${index}`}/>
                            </div>
                            <label for={`isImgMain-${index}`}>
                                Hoofdafbeelding
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
                                        placeholder="&nbsp;"
                                        rows="3"
                                ></textarea>
                            </label>
                            <label for="imgAlt">
                                Alt-tekst
                                <textarea
                                        id="imgAlt"
                                        name="imgAlt"
                                        rows="3"
                                ></textarea>
                            </label>
                            <div>
                                <label for="imgSource">
                                    Bron
                                    <input
                                            id="imgSource"
                                            name="imgSource"
                                            type="text"
                                    />
                                </label>
                                <label for="imgYear">
                                    Jaar
                                    <input
                                            id="imgYear"
                                            name="imgYear"
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
            <fieldset class="timeline" form="Buildings">
                {#each timelineEntries as entry, index}
                    <div>
                        <label for="timelineYear{index}">
                            Year
                            <input
                                    bind:value={entry.year}
                                    id="timelineYear{index}"
                                    name="timelineYear{index}"
                                    placeholder="&nbsp;"
                                    type="number"
                            />
                        </label>

                        <label for="timelineDescription{index}">
                            Description
                            <input
                                    bind:value={entry.description}
                                    id="timelineDescription{index}"
                                    name="timelineDescription{index}"
                                    placeholder="&nbsp;"
                                    type="text"
                            />
                        </label>
                    </div>
                {/each}
                <Button size="content" subtle  on:click={addTimelineEntry}>+ Voeg tijdlijn toe</Button>
            </fieldset>

            <div class="hidden">
                <input id="nummeraanduidingIdentificatie" name="nummeraanduidingIdentificatie" type="text" bind:value={bagID} />
            </div>
        </div>
    </details>

    <details name="buildings">
        <summary><h2>Overzicht</h2></summary>
        <div class="step-content">
            <fieldset>
            <!-- Review/Summary Part -->
                <div>
                    <section>
                        <h3>Anno: {constYearSum}</h3>
                        <h4>test {AdresSum}</h4>
                        <img src="" alt="">
                    </section>
                    <section>
                        <div>
                            <h3>Afstand tot</h3>
                            <p>?? meter</p>
                        </div>
                        <div>
                            <h3>Origineel</h3>
                            <p>{typeOfUseSum}</p>
                        </div>
                    </section>
                    <section>
                        <span>{tagsSum}</span>
                    </section>
                    <p>{descriptionSum}</p>
                </div>
                <div>
                    <img src="" alt="">
                    <section>
                        <h3>timeline</h3>
                        <ol>
                            {#each timelineEntries as entry, index}
                                <li>
                                    <h4>{entry.year}</h4>
                                    <p>{entry.description}</p>
                                </li>
                            {/each}
                        </ol>
                    </section>
                </div>
                <div>
                    <iframe height='400px' style="border:none;" title="Anno Amsterdam Gebouw" width='100%'></iframe>
                </div>
                <input id="nummeraanduidingIdentificatie" required name="nummeraanduidingIdentificatie" type="text" bind:value={bagID} />
            </fieldset>
        </div>
    </details>
    <input type="submit" value="Maak gebouw aan">

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

    :has(input:placeholder-shown) > summary {

      background: transparent !important;
      color: var(--text-color) !important;

    }
    :has(input:placeholder-shown) > summary h2::before {
      background-color: var(--primary-color) !important;

    }
    details:nth-of-type(3) summary {
      background: transparent !important;
      color: var(--text-color) !important;
    }
    details:nth-of-type(3) summary h2::before {
      background-color: var(--primary-color) !important;
    }
    :has(input[type="radio"]:checked) > summary {
        background: var(--primary-color) !important;
        color: var(--text-color-inverse) !important;
    }



    input[type='submit'] {
      position: absolute;
      z-index: 999;
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

    input[type='submit']:hover {
      background-color: var(--secondary-color);
    }


    details {
      margin-bottom: 1.5rem;
      background-image: none;
      grid-row: 1 / 2;
      height: 100%;
      position: relative;
      left: 0;

      &[open] > summary {
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

                &:focus {
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

                div:first-of-type {
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
                  text-align: end;
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

          &.timeline {
            div {
              label:first-of-type {
                flex-grow: .2;
              }
            }

            div.button {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0.5rem 0.75rem;
              border: none;
              border-radius: 0.25rem;
              cursor: pointer;
              font-size: clamp(1rem, 1vw, 1.1rem);
              transition: .15s;
              background-color: var(--text-color-inverse);
              color: var(--primary-color);
              border: 2px solid var(--primary-color);
              display: flex;
              justify-content: center;
              align-items: center;
              width: max-content;
              height: 2rem;
              margin-top: 1rem;

              &:hover {
                background-color: var(--primary-color);
                color: var(--text-color-inverse);
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

          label > input, label > select {
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
