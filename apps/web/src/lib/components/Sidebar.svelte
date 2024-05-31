<script>

</script>

<aside>
	<div>
		<p>Filters:</p>
		<button>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					  d="M0.863563 0.156456C0.668301 -0.0388058 0.351719 -0.0388058 0.156457 0.156456C-0.0388056 0.351719 -0.0388059 0.668301 0.156456 0.863563L8.28831 8.99541L0.156576 17.1271C-0.0386864 17.3224 -0.0386863 17.639 0.156576 17.8342C0.351838 18.0295 0.66842 18.0295 0.863682 17.8342L8.99541 9.70252L17.127 17.8341C17.3223 18.0294 17.6389 18.0294 17.8341 17.8341C18.0294 17.6389 18.0294 17.3223 17.8341 17.127L9.70252 8.99541L17.8342 0.863685C18.0295 0.668423 18.0295 0.35184 17.8342 0.156578C17.639 -0.0386842 17.3224 -0.0386845 17.1271 0.156578L8.99541 8.2883L0.863563 0.156456Z"
					  fill="#000" />
			</svg>
		</button>
	</div>
	<div class="divider" />
	<ul>
		<li>
			<label>
				16e eeuw
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				17e eeuw
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				18e eeuw
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				19e eeuw
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				20e eeuw
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				21e eeuw
				<input type="checkbox" />
			</label>
		</li>
	</ul>
	<div class="divider" />
	<ul>
		<li>
			<label>
				Voorgevel
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				Bewoner
				<input type="checkbox" />
			</label>
		</li>
		<li>
			<label>
				Type
				<input type="checkbox" />
			</label>
		</li>
	</ul>
</aside>

<style lang="scss">
  aside {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    width: 100%;
    height: 100dvh;
    z-index: 20;
    padding: 2rem 1rem;
    color: black;
    transform: translateX(100%);
    transition: all .3s ease-in-out;

    .show {
      transform: translateX(0);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        appearance: none;
        background-color: transparent;
        border: none;
      }
    }

    p {
      font-size: 2rem;
    }

    label {
      display: flex;
      flex-direction: row-reverse;
      justify-content: start;
      gap: .5rem;
    }

  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
    margin: 1rem 0;
  }
</style>