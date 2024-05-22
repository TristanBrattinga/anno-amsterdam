<script lang="ts">
	import { ThemeSwitcher, LocaleSwitcher } from '$components';

	export let data;
</script>

<ThemeSwitcher {data} />
<LocaleSwitcher lang={data.lang} />
