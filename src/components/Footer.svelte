<script lang="ts">
	import { Footer, FooterLink, FooterLinkGroup } from "flowbite-svelte";
	import github from "$lib/assets/github.svg";
</script>

<Footer class="flex flex-row-reverse">
	<FooterLinkGroup>
		<FooterLink href="https://github.com/Attacktive/troubleshooter-editor-front-end-svelte">
			<img src={github} alt="to the GitHub repository" width={48} height={48}/>
		</FooterLink>
	</FooterLinkGroup>
</Footer>
