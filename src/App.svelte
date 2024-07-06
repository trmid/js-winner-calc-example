<script lang="ts">
	import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import ServiceWorker from "./components/ServiceWorker.svelte";
  import { routes } from "./routes";
  import Footer from "./components/Footer.svelte"
</script>

<!-- Header -->
<Header />

<!-- Main -->
<main>

  <!-- Router -->
	<Router {routes}/>

</main>

<!-- Footer -->
<Footer></Footer>

<!-- Service Worker -->
<ServiceWorker />
