<template lang="pug">
.material-symbols-outlined.big.backspace(@click="router.go(-1)") keyboard_backspace
#uploadWindow
    .wrap
        .inner
            .material-symbols-outlined(style="font-size: 36px; color:rgba(0,0,0,0.8);") cloud_upload

            br
            br

            form#uploadForm(@submit.prevent="upload")
                .input.required
                    label(for="title") Title
                    input#title(type="text" name="title" placeholder="Title" @input="e=> { form.title = e.target.value; }" required)
                .input.required
                    label(for="artist") Artist
                    input#artist(type="text" name="artist" placeholder="Artist" @input="e=> { form.artist = e.target.value; }" required)
                .inputFile.required
                    .tit mp3
                    p {{ uploadFileName || "Upload a music file"}}
                    label(for="file") Click
                    input#file(hidden type="file" name="file" ref="uploadFile" @change="readURL('file')")
                .inputFile.required
                    .tit Cover
                    p {{ uploadCoverName || "Upload a cover file"}}
                    label(for="cover") Click
                    input#cover(hidden type="file" name="cover" ref="uploadCover" @change="readURL('cover')")
                .previewFile(ref="previewFile")
                    img#preview(ref="preview")
                .input.lyrics(:class="{'required' : form.lyrics}")
                    label(for="lyrics") Lyrics
                    textarea#lyrics(type="text" name="lyrics" placeholder="Lyrics" @input="e=> { form.lyrics = e.target.value; }" @keydown="resizeTextarea")
                .input(:class="{'required' : form.year}")
                    label(for="year") Year
                    input#year(type="number" placeholder="Year" v-model='year')
                    //- .controlBtn
                    //-     .btn.minus
                    //-     .btn.plus
                .input(:class="{'required' : form.track}")
                    label(for="track") Track
                    input#track(type="text" name="track" placeholder="Track" @input="e=> { form.track = e.target.value; }")
                .input(:class="{'required' : form.tag}")
                    label(for="tag") Tag
                    input#tag(type="text" placeholder="separate with a comma(,)" pattern="[a-zA-Z0-9 ,]+" v-model='tagsInput')
                input.submit(type="submit" value="Upload")
</template>

<script setup>
import { skapi, account } from '@/main';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

let route = useRoute();
let router = useRouter();
let form = reactive({
    title: '',
    artist: '',
    track: '',
})
let uploadCoverName = ref('');
let uploadFileName = ref('');
let uploadFile = ref(null);
let uploadCover = ref(null);
let previewFile = ref(null);
let preview = ref(null);
let year = ref('');
let tagsInput = ref('');
let promiseRunning = ref(false);

let resizeTextarea = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = (12 + e.target.scrollHeight) + 'px';
}
let readURL = (fileName) => {
    if (uploadFile.value.files.length > 0 || uploadCover.value.files.length > 0) {

        if(fileName == 'file') {
            uploadFileName.value = uploadFile.value.files[0].name;
        } else {
            uploadCoverName.value = uploadCover.value.files[0].name;
    
            let reader = new FileReader();
            
            reader.onload = (e) => {
                console.log(e.target.result);
                preview.value.src = e.target.result;
            };
            reader.readAsDataURL(uploadCover.value.files[0]);
        }
    }
}
let upload = (e) => {
    promiseRunning.value = true;

    let data = {
        title: form.title,
        artist: form.artist,
        track: form.track,
    }

    let config = {
        table: {
            name: 'Album',
            access_group: 'authorized'
        }
    }

    if(tagsInput.value) {
        config.tags = tagsInput.value.split(',').map(t => t.trim());
    } else if(year.value) {
        // config.index.name = 'year';
        // config.index.value = year.value;
        config.index = {
            name: 'year',
            value: year.value
        }
    }
    skapi.postRecord(e, config).then(r=>{
        console.log(r)
        router.push({ path: '/' });
    });
}
</script>

<style lang="less" scoped>
#uploadWindow {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    display: table;
    z-index: 99999;
}

.backspace {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 9;
    cursor: pointer;
}

.wrap {
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    backdrop-filter: blur(30px);
    color: rgba(0,0,0,0.8);
}

.inner {
    width: 400px;
    padding: 100px 0;
    margin: 0 auto;
}

.title {
    font-size: 1.6em;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
}

#uploadForm {
    margin-bottom: 20px;

    .input {
        position: relative;
        width: 100%;

        &.required {
            label, .tit {
                opacity: 1;
            }
        }

        &.lyrics {
            label {
                display: block;
                margin-bottom: 10px;
            }

            textarea {
                width: 100%;
                display: block;
                resize: none;
                padding: 8px;
                border-radius: 8px;
                border: 0;
                background-color: rgba(0,0,0,0.1);
                margin-bottom: 10px;
            }
        }
    }

    label,
    .tit {
        display: inline-block;
        width: 80px;
        opacity: 0.5;
        display: none;
    }

    input,
    p {
        display: inline-block;
        padding: 10px;
        border-radius: 8px;
        // width: calc(100% - 80px);
        width: 100%;
        border: 0;
        background-color: rgba(0,0,0,0.1);
        margin-bottom: 10px;

        &.submit {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 0;
            font-size: 16px;
            background-color: rgba(0,0,0,0.1);
            border: unset;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
                background-color: rgba(0,0,0,0.3);
            }
        }
    }

    .controlBtn {
        position: absolute;
        top: 18px;
        right: 20px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            position: relative;
            text-align: center;
            font-size: 20px;
            
            &::before {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 25px;
                background-color: #000;
                border-radius: 10px;
                transition: all 0.3s;
                opacity: 0.5;
                cursor: pointer;
                z-index: -1;
            }
            &:first-child {
                &::before {
                    content: '-';
                }
            }
            &:last-child {
                &::before {
                    content: '+';
                }
            }
            &:hover {
                &::before {
                    opacity: 1;
                }
            }
        }
    }

    .inputFile {
        position: relative;
        margin-bottom: 10px;

        &.required {
            .tit {
                opacity: 1;
            }
        }

        .tit {
            opacity: 0.5;
        }

        p {
            margin: 0;
            padding-right: 80px;
            font-size: 14px;
            color: rgba(0,0,0,0.4);
        }

        label {
            position: absolute;
            top: 10px;
            right: 8px;
            width: 65px;
            border-radius: 8px;
            font-size: 14px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
            cursor: pointer;
            display: block !important;

            &:hover {
                opacity: 1;
            }
        }

        input {
            display: none;
        }
    }

    .previewFile {
        width: 400px;
        height: 400px;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,0.1);
        margin-bottom: 10px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}</style>