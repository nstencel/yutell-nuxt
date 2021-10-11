<template>
<div>
    <h1>Howdy doo! {{count}} - {{nameOf}} - {{test}}</h1>
    <button @click="changeCount">Change Count</button>

    <h1>{{client}}</h1>
<!--
    <div
      class="video-player-box"
      ref="videoPlayer"
      v-video-player:myVideoPlayer="playerOptions"
      :playsinline="true"
    ></div>
    -->
</div>
</template>

<script>

export default{
    async asyncData({ $http }) {
        const response = await $http.get("https://api.yutell.com/api/stories/story-count");
        const data = await response.json();
        const count = data.number;
        const nextResponse = await $http.get("https://api.yutell.com/api/stories/734");
        const nextData  = await nextResponse.json();
        const story = nextData;
                
        return {count, story};
    },
    data(){
        return{
            client:0,
            story:{},
            count: 0,
            nameOf: "",
            test: "",
            playerOptions: {
                controls: true,
                muted: false,
                language: "en",
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [
                    {
                        type: "video/mp4",
                        src: ""
                    }
                ],
                poster: "https://th.bing.com/th/id/R.9c53cce7b4b08a565e036a1011651fd3?rik=C16I5vmLP7PcFQ&pid=ImgRaw&r=0"
            }
        }
    },
    mounted(){
        this.getName();
        this.getPhrase();
        this.getStory();
        console.log("This is: " + this.playerOptions.sources[0].src);
        this.client = 1;
    },
    methods: {
        async getCount() {
            await this.$http.get("https://api.yutell.com/api/stories/story-count")
                    .then(response => {
                        return response.json();
                    })
                    .then(function(data){
                        let count = data;
                        return {count};
                    })
        },
        getName(){
            this.$http.get("https://api.yutell.com/api/stories/story-count")
                .then(response => {
                            return response.json();
                        })
                        .then((data)=>{
                            console.log(data.name);
                            this.nameOf = data.name;
                        })
        },
        getPhrase() {
            this.test = "Hello World!";
        },
        getStory(){
            this.$http
                .get("https://api.yutell.com/api/stories/734")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    this.story = data;
                    this.playerOptions.sources[0].src = this.story.video_url
                    console.log(this.story);
                });
        },
        changeCount() {
            this.count = 100;
        }
    }
    
}
</script>
