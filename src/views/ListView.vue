<template>
    <div class="page-wrap">
        <h1 class="app-name">To Do List</h1>
        <router-link to="/form" class="to-form">You can add task here!</router-link>
        <div class="list-wrap">
            <div class="list">
                <h2 class="list-title">Programming</h2>
                <div class="list-time">
                    <fa class="fa-clock" :icon="['far', 'clock']"></fa>
                    <p class="list-time__text">13:00<span> - </span>16:00</p>
                </div>
                <fa class="fa-pen" :icon="['fas', 'pen']"></fa>
                <fa class="fa-trash" :icon="['fas', 'trash-can']"></fa>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListView'
}

</script>

<style lang="scss" scoped>
.page-wrap {
    padding: 72px 0px;
}

.app-name {
    color: #FFFFFF;
    font-size: 24px;
    text-align: center;
    margin-bottom: 48px;
}

.to-form {
    color: #FFFFFF;
    display: block;
    font-size: 18px;
    text-align: center;
}

.list-wrap {
    display: flex;
    flex-flow: column;
    row-gap: 24px;
}

.list {
    background-color: #FFFFFF;
    border-radius: 2px;
    height: 169px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &-title {
        color: #221233;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 36px;
    }

    &-time {
        display: flex;
        align-items: center;
        justify-content: center;

        &__text {
            font-size: 14px;
            font-weight: bold;
        }
    }
}

.fa-clock {
    margin-right: 4px;
}

.fa-pen {
    position: absolute;
    top: 14px;
    right: 14px;
}

.fa-trash {
    position: absolute;
    bottom: 14px;
    right: 14px;
}
</style>