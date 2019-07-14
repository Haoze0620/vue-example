<template>
    <div>
        <recommendation/>
        <newsong/>
    </div>
</template>

<script>
import Recommendation from '@/components/recommendation'
import Newsong from '@/components/newsong'
export default {
    name:'Home',
    components:{
        Recommendation,Newsong
    }
}
</script>