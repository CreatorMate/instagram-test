<script setup lang='ts'>
    import NavButton from "~/src/components/Sidebar/NavButton.vue";
    import type {NavItem} from "~/src/components/Sidebar/NavItem";

    const {user} = useOidcAuth();

    const navItems: NavItem[] = [
        {
            linkTo: '/',
            name: 'creators',
            iconName: 'material-symbols:supervisor-account-outline-rounded',
            children: [],
            premium: false
        },
        {
            linkTo: '/analytics',
            name: 'analytics',
            iconName: 'material-symbols:bar-chart-4-bars',
            children: [],
            premium: false
        },
        {
            linkTo: '/content',
            name: 'content',
            iconName: 'material-symbols:animated-images-outline',
            children: [],
            premium: false
        },
        {
            linkTo: '/countries',
            name: 'countries',
            iconName: 'material-symbols:graph-3',
            children: [],
            premium: false
        },
        {
            linkTo: '/projects/1/tutorial-project',
            name: 'projects',
            iconName: 'material-symbols:folder-open-outline',
            children: [],
            premium: false
        }
    ]

</script>

<template>
    <aside class="h-full min-w-[290px] w-[290px] flex flex-col">
        <NuxtImg class="mt-4 ml-4" width="48" src="/logo-light.svg"/>
        <nav class="mt-7 flex flex-col flex-grow gap-2">
            <NavButton v-for="navItem of navItems" :premium="navItem.premium" :link-to="navItem.linkTo"
                       :name="navItem.name" :icon-name="navItem.iconName" :children="navItem.children"/>
            <div class="mt-auto flex flex-col gap-3">
                <div class="pt-3 border-t border-[#C6C6C6] w-full">
                    <NavButton :premium="false" link-to="/settings" name="settings" icon-name="uil:cog" :children="[]"/>
                </div>
                <LazySidebarSbUserSession/>
            </div>
        </nav>
    </aside>
</template>