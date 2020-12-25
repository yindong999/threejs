export default({
    created(){
        console.log('我是混合对象里面的created');
        this.mUpper();
    },
    methods:{
        mUpper(){
            console.log("mixin upper")
        }
    }
})