<script>
  import { onMount } from 'svelte';
  
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
</script>

<form id="Buildings">
  
  <details open>
    <summary><h2>Adres</h2></summary>
    <div class="step-content">
      <!-- Question 1 -->
      <fieldset form="Buildings">
        <div>
          <label for="longtitute">
            Longitude:
            <input id="longtitute" name="longtitute" required type="number">
          </label>
          
          <!-- Question 2 -->
          <label for="latitute">
            Latitude:
            <input id="latitute" name="latitute" required type="number">
          </label>
        </div>
        
        <!-- Question 3 -->
        <div>
          <label for="street">
            Straat:
            <input id="street" name="street" required type="text">
          </label>
          
          <!-- Question 4 -->
          <label for="Hnumber">
            Huisnummer:
            <input id="Hnumber" name="Hnumber" required type="number">
          </label>
          
          <!-- Question 5 -->
          <label for="postcode">
            Postcode:
            <input id="postcode" name="postcode" required type="text">
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
        <label for="address">
          Adres
          <input id="address" name="address" required type="text">
        </label>
        
        <!-- Question 7 -->
        <label for="name">
          Naam (evt. in plaats van adres)
          <input id="name" name="name" required type="text">
        </label>
        <!-- Question 8 -->
        <label for="constYear">
          Bouwjaar
          <input id="constYear" name="constYear" required type="number">
        </label>
        <!-- Question 9 -->
        <label for="name">
          Naam (evt. in plaats van adres)
          <input id="name" name="name" required type="text">
        </label>
        <!-- Question 10 -->
        <label for="typeOfUse">
          Gebruik (?) [select van maken]
          <input id="typeOfUse" name="typeOfUse" required type="text">
        </label>
        <!-- Question 11 -->
        <label for="tags">
          Tags (?) [select + checkbox van maken]
          <input id="tags" name="tags" required type="text">
        </label>
        <!-- Question 12 -->
        <label for="description">
          Omschrijving
          <textarea id="description" name="description" rows="4" cols="50" required></textarea>
        </label>
      </fieldset>
    </div>
  </details>

  <details>
    <summary><h2>Afbeeldingen</h2></summary>
    <div class="step-content">
      <!-- Question 5 -->
      <fieldset form="Buildings">
        <label for="email">
          Email:
          <input id="email" name="email" required type="email">
        </label>
        
        <!-- Question 6 -->
        <label for="phone">
          Phone:
          <input id="phone" name="phone" required type="tel">
        </label>
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
          <input id="color" name="color" required type="text">
        </label>
        
        <!-- Question 8 -->
        <label for="food">
          Favorite Food:
          <input id="food" name="food" required type="text">
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
        //border-left: 3px solid var(--primary-color);
        border-radius: 0.25rem;
        grid-row: 2 / -1;
        grid-column: 1 / -1;
        
        
        fieldset {
          //border: 1px solid var(--primary-color);
          border-radius: 0.25rem;
          width: 100%;
          padding: 2rem 3rem 1rem;
          margin-top: .5rem;
          background-color: var(--bg-color);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: calc(100% - 2rem);
          
          div{
            display: flex;
            justify-content: flex-start;
            gap: 1rem;
          }
          label > input {
            display: flex;
            
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