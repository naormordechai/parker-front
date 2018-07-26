
<template>
    <section>
    Hello!!
    <h3>Login</h3>
    {{$store.getters.loggedInUser}}
    <form>
        <input type="text">
        <input type="submit" value="Login" @click="login">
    </form>
    </section>
</template>

<script>
export default {
methods:{
    login(){
        this.$store.commit({type: 'setUser', user: {
            _id: 50505050,
            eMail: 'a@a.com',
            firstName: 'elad',
            lastName : 'frizi'
        }})
    }
}
}
</script>

<style>

</style>
