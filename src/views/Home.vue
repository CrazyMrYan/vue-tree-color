<template>
    <div>
        <vue2-org-tree :data="data" :horizontal="true" name="test" :NodeClass="NodeClass" :judge="judge" :label-class-name="labelClassName" collapsable @on-expand="onExpand" @on-node-mouseover="onMouseover" @on-node-mouseout="onMouseout" />
        <div v-show="BasicSwich" class="floating">
            <p>ID:{{BasicInfo.id}}</p>
            <p>Name:{{BasicInfo.label}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                BasicSwich: false,
                BasicInfo: { id: null, label: null },
                judge: { swtich: true },
                NodeClass:[
                    "myred",
                    "myger",
                    "myblue"
                ],
                data: {
                    id: 0,
                    label: "XXX科技有限公司",
                    children: [
                        {
                            id: 2,
                            label: "产品研发部",
                            children: [
                                {
                                    id: 5,
                                    label: "研发-前端",
                                    swtich: "myred"
                                },
                                {
                                    id: 6,
                                    label: "研发-后端",
                                    swtich: "myger"
                                },
                                {
                                    id: 9,
                                    label: "UI设计",
                                    swtich: 111
                                },
                                {
                                    id: 10,
                                    label: "产品经理"
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: "销售部",
                            children: [
                                {
                                    id: 7,
                                    label: "销售一部",
                                    swtich: "myblue"
                                },
                                {
                                    id: 8,
                                    label: "销售二部",
                                    swtich: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: "财务部"
                        },
                        {
                            id: 9,
                            label: "HR人事"
                        }
                    ]
                },
                horizontal: false,
                collapsable: true,
                expandAll: false,
                labelClassName: "org-bg-res"
            };
        },
        created() {
            this.expandChange();
        },
        methods: {
            renderContent(h, data) {
                return data.label;
            },
            onMouseout(e, data) {
                this.BasicSwich = false;
            },
            onMouseover(e, data) {
                this.BasicInfo = data;
                this.BasicSwich = true;
                var floating = document.getElementsByClassName("floating")[0];
                floating.style.left = e.clientX+10 + "px";
                floating.style.top = e.clientY+10 + "px";
            },
            onExpand(e, data) {
                if ("expand" in data) {
                    data.expand = !data.expand;
                    if (!data.expand && data.children) {
                        this.collapse(data.children);
                    }
                } else {
                    this.$set(data, "expand", true);
                }
            },
            NodeClick(e, data) {
                alert(data.label);
                console.log(e, data);
            },
            collapse(list) {
                var _this = this;
                list.forEach(function(child) {
                    if (child.expand) {
                        child.expand = false;
                    }
                    child.children && _this.collapse(child.children);
                });
            },
            expandChange() {
                this.toggleExpand(this.data, true);
            },
            toggleExpand(data, val) {
                var _this = this;
                if (Array.isArray(data)) {
                    data.forEach(function(item) {
                        _this.$set(item, "expand", val);
                        if (item.children) {
                            _this.toggleExpand(item.children, val);
                        }
                    });
                } else {
                    this.$set(data, "expand", val);
                    if (data.children) {
                        _this.toggleExpand(data.children, val);
                    }
                }
            }
        }
    };
</script>
<style lang="less" >
.myblue{
    background: skyblue;
    color: #fff;
}
.myred{
    background-color: tomato;
    color: #fff;
}
.myger{
    background: green;
    color: #fff;
}
.org-bg-err {
    background-color: tomato;
    color: #fff;
}
.org-tree-node-label {
    white-space: nowrap;
}
.bg-white {
    background-color: white;
}
.org-bg-res {
    background-color: orange;
    color: #fff;
    cursor: pointer;
}
.bg-gold {
    background-color: gold;
}
.bg-gray {
    background-color: gray;
}
.bg-lightpink {
    background-color: lightpink;
}
.bg-chocolate {
    background-color: chocolate;
}
.bg-tomato {
    background-color: tomato;
}
.floating {
    background: rgba(0, 0, 0, 0.7);
    width: 160px;
    height: 100px;
    position: absolute;
    color: #fff;
    padding-top: 15px;
    border-radius: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    left: 0;
    top: 0;
    transition: all 0.3s;
    z-index: 999;
    text-align: left;
    font-size: 12px;
}
</style>