<script>
	import "../app.css";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
</script>

<div class="p-3">
	<Header/>
</div>
<div class="px-3 py-1">
	<slot/>
</div>
<div class="px-3">
	<Footer/>
</div>
