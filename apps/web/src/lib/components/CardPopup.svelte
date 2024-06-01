<script lang="ts">

	// Props
	import type { Building, Coords } from '$types';
	import { getDistanceFromLatLonInKm } from '~/lib';

	export let building: Building;
	export let location: Coords | null = null;

	$: km =
		location && building.location.coordinates[0] !== 0
			? getDistanceFromLatLonInKm(
				location.lat,
				location.lng,
				building.location.coordinates[0],
				building.location.coordinates[1]
			)
			: 0;

	$: distance = km > 0 ? Math.round(km < 1 ? km * 1000 : km) + (km < 1 ? ' m' : ' km') : '';
</script>

<a href="#top">
	<div>
		<p>{building?.address || 'Address missing'}</p>
		<button>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					  d="M0.863563 0.156456C0.668301 -0.0388058 0.351719 -0.0388058 0.156457 0.156456C-0.0388056 0.351719 -0.0388059 0.668301 0.156456 0.863563L8.28831 8.99541L0.156576 17.1271C-0.0386864 17.3224 -0.0386863 17.639 0.156576 17.8342C0.351838 18.0295 0.66842 18.0295 0.863682 17.8342L8.99541 9.70252L17.127 17.8341C17.3223 18.0294 17.6389 18.0294 17.8341 17.8341C18.0294 17.6389 18.0294 17.3223 17.8341 17.127L9.70252 8.99541L17.8342 0.863685C18.0295 0.668423 18.0295 0.35184 17.8342 0.156578C17.639 -0.0386842 17.3224 -0.0386845 17.1271 0.156578L8.99541 8.2883L0.863563 0.156456Z"
					  fill="#000" />
			</svg>
		</button>
	</div>
	<div>
		<p class="anno">Anno {building.construction_year}</p>
		<ul>
			<li>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
					 xmlns:xlink="http://www.w3.org/1999/xlink">
					<mask id="mask0_3366_6198" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18"
						  height="18">
						<rect width="18" height="18" fill="url(#pattern0_3366_6198)" />
					</mask>
					<g mask="url(#mask0_3366_6198)">
						<rect y="-2.39062" width="23.0625" height="23.4844" fill="#00425A" />
					</g>
					<defs>
						<pattern id="pattern0_3366_6198" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlink:href="#image0_3366_6198" transform="scale(0.00781252)" />
						</pattern>
						<image id="image0_3366_6198" width="128" height="128"
							   xlink:href="data:image/png;base64,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" />
					</defs>
				</svg>
			</li>
			<li>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
					 xmlns:xlink="http://www.w3.org/1999/xlink">
					<mask id="mask0_3366_6201" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18"
						  height="18">
						<rect width="18" height="18" fill="url(#pattern0_3366_6201)" />
					</mask>
					<g mask="url(#mask0_3366_6201)">
						<rect x="-2.80127" y="-2.43994" width="22.6406" height="23.7657" fill="#00425A" />
					</g>
					<defs>
						<pattern id="pattern0_3366_6201" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlink:href="#image0_3366_6201" transform="scale(0.00781252)" />
						</pattern>
						<image id="image0_3366_6201" width="128" height="128"
							   xlink:href="data:image/png;base64,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" />
					</defs>
				</svg>
			</li>
		</ul>
	</div>
	<ul>
		<li>
			<p>Distance to</p>
			<p>{distance ? `(${distance})` : ''}</p>
		</li>
		<li><span /></li>
		<li>
			<p>Type of use</p>
			<p>{building?.type_of_user}</p>
		</li>
	</ul>
	<svg class="triangle" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M30 0L18.5355 11.4645C16.5829 13.4171 13.4171 13.4171 11.4645 11.4645L0 0H30Z" fill="white" />
	</svg>
</a>

<style lang="scss">

  a {
    display: none;
    padding: 2.25rem 1.25rem 1.75rem;
    border-radius: 10px;
    position: absolute;
    right: 10%;
    top: 50%;
    background-color: #ffffff;
    max-width: 248px;
    width: 100%;

    &.show {
      display: block;
    }

    button {
      position: absolute;
      right: 5px;
      top: 5px;
      appearance: none;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;

    }

    div {
      display: flex;

      &:nth-of-type(1) {
        margin-bottom: 10px;
      }


      &:nth-of-type(2) {
        margin-bottom: 12px;
        justify-content: space-between;

        p {
          font-size: 22px;
          color: var(--secondary-color-dark);
        }


        ul {
          gap: .5rem;
        }

      }

      p {
        line-height: 1;
      }
    }

    ul {
      display: flex;
      justify-content: space-between;

      li {

        span {
          display: block;
          height: 100%;
          width: 1px;
          background-color: #C5D9E0;
        }

        p:first-of-type {
          font-size: .75rem;
          color: var(--primary-color-light);
          opacity: 50%;
        }
      }
    }
  }

  .triangle {
    position: absolute;
    width: 30px;
    height: 15px;
    left: calc(50% - 30px / 2 + 34px);
    bottom: -12px;
    border-radius: 0;
  }
</style>