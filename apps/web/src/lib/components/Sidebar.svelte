<script lang="ts">
	export let open: boolean = false;
	export let toggleSidebar: (event: TouchEvent) => void;

	const closeSidebar = () => {
		open = false;
	};
</script>

<style>
    .sidebar {
        height: 100%;
        width: 250px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: -250px;
        background-color: #111;
        overflow-x: hidden;
        transition: left 0.3s ease-out;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
    }

    .sidebar.open {
        left: 0;
    }

    .sidebar a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidebar a:hover {
        color: #f1f1f1;
    }

    .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
        cursor: pointer;
    }

    .notch {
        position: fixed;
        top: 50%;
        left: 0;
        width: 20px;
        height: 40px;
        background-color: #333;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 2;
        transform: translateY(-50%);
    }
</style>

<div class="sidebar" class:open={open}>
	<a href="javascript:void(0)" class="closebtn" on:click={closeSidebar}>×</a>
	<a href="#">Home</a>
	<a href="#">About</a>
	<a href="#">Services</a>
	<a href="#">Contact</a>
</div>

<div class="notch" on:touchstart={toggleSidebar}>&#9776;</div>
