 

<template>
  <section class="wh_container">
    <div class="cardBtn">
      <div class="btnOne" @click="monthOrDay(true)">
        <span
          class="f14"
          :style="{
            color: sevenDayOrMonth ? '#ED5454' : '#A8B2B9',
          }"
          >7天</span
        >
      </div>
      <div class="btnOne" @click="monthOrDay(false)">
        <span
          class="f14"
          :style="{ color: !sevenDayOrMonth ? '#ED5454' : '#A8B2B9' }"
          >月</span
        >
      </div>
      <div
        class="currentTime"
        :style="{ left: sevenDayOrMonth ? '-2%' : '48%' }"
      ></div>
    </div>
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li class="wh_content_li">{{ dateTop }}</li>
        <div class="rightjt">
          <li @click="PreMonth(myDate, false)">
            <div
              class="wh_jiantou1"
              :style="{
                'border-top': !leftBtnUse
                  ? '2px solid #DEDEE3'
                  : '2px solid #c9c9d3',
                'border-left': !leftBtnUse
                  ? '2px solid #DEDEE3'
                  : '2px solid #c9c9d3',
              }"
            ></div>
          </li>
          <li @click="NextMonth(myDate, false)">
            <div class="wh_jiantou2"></div>
          </li>
        </div>
      </div>
      <div class="wh_content">
        <div
          class="wh_content_item"
          v-for="(tag, index) in textTop"
          :key="index"
        >
          <div class="wh_top_tag">{{ tag }}</div>
        </div>
      </div>
      <div class="wh_content">
        <div
          class="wh_content_item"
          v-for="(item, index) in list"
          :key="index"
          @click="sevenDayOrMonth && clickDay(item, index)"
        >
          <div
            :style="{
              width: '100%',
              display: 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              background:
                chooseDays.sevenDayOrMonth && firstDate == item.date
                  ? 'linear-gradient(to right, white 0%,white 50%,#f4f7fe 51%,#f4f7fe 100%)'
                  : chooseDays.sevenDayOrMonth && endDate == item.date
                  ? 'linear-gradient(to right, #f4f7fe 0%,#f4f7fe 50%,white 51%,white 100%)'
                  : '',
              'border-radius':
                firstDate == item.date
                  ? '45% 0 0 45%'
                  : endDate == item.date
                  ? '0 45% 45% 0'
                  : '',
            }"
            :class="[item.isMark ? 'item_one' : '']"
          >
            <div
              :style="{ 'user-select': 'none' }"
              v-bind:class="[
                { wh_isMark: item.isMark },
                { wh_other_dayhide: item.otherMonth !== 'nowMonth' },
                { wh_want_dayhide: item.dayHide },
                { wh_isToday: item.isToday },
                { wh_chose_day: item.chooseDay },
                { wh_item_date: sevenDayOrMonth },
                { wh_item_date_month: !sevenDayOrMonth },
                setClass(item),
              ]"
            >
              {{ item.id }}
            </div>
            <div class="hasClass" v-if="item.hasClass"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  getDays,
  getNextSeventhDay,
  getPreSeventhDay,
  getCurrentDay,
  getCurrentMonthFirst,
  getCurrentMonthLast,
  getLastYearYestdy,
} from "@/utils/fn";
import timeUtil from "./calendar";
export default {
  data() {
    return {
      leftBtnUse: true,
      lastNum: 0,
      sevenDayOrMonth: true, // tab 选择的是七天还是月的标志，true：七天；false:月；
      firstDate: "",
      flower: false,
      endDate: "",
      myDate: [],
      otherMonth: "", // 判断是当前月还是上个月，还是下个月
      list: [],
      historyChose: [],
      dateTop: "",
      someDay: 0,
      startAndEndTime: {
        beginDate: "", // 开始时间 ; - 格式的
        beginDate2: "", // 开始时间2 ; / 格式的
        endDate: "", // 结束时间 ;  - 格式的
        endDate2: "", // 结束时间2;/ 格式的
      },
      sevenDayStart: "", // 七天开始的时间
      sevenDayEnd: "", // 七天结束的时间
      monthDayStart: "", // 一个月开始的时间
      monthDayEnd: "", // 一个月结束的时间
      copyStartAndEndTime: {},
      lastYearDayTimes: 0, // 一年前的今天的毫秒数
      chooseDays: {
        sevenDayOrMonth: true, // 七天：true;  月：false；
        startDay: "", // 七天或者一个月的开始时间
        endDay: "", // 七天或者一个月的结束时间
        sevenDay: [], // 选择七天时的所有的时间
        monthDay: [], // 选择一个月的所有时间
        textTop: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      },
    };
  },
  props: {
    hasCourse: {
      type: Array,
      default: () => [],
    },
    markDate: {
      type: Array,
      default: () => [],
    },
    markDateMore: {
      type: Array,
      default: () => [],
    },
    textTop: {
      type: Array,
      default: () => ["一", "二", "三", "四", "五", "六", "日"],
    },
    sundayStart: {
      type: Boolean,
      default: () => false,
    },
    agoDayHide: {
      type: String,
      default: `0`,
    },
    futureDayHide: {
      type: String,
      default: `2554387200`,
    },
  },
  created() {
    this.intStart();
    this.myDate = new Date();
  },
  methods: {
    monthOrDay(flag) {
      this.sevenDayOrMonth = flag;

      // 切换tab时，如果是月则返回当前月的全部天数据，如果是七天返回七天的数据；七天：true; 月：false;
      if (!flag) {
        this.chooseDays.monthDay = this.list;
        this.chooseDays.startDay = this.sevenDayStart;
        this.chooseDays.endDay = this.sevenDayEnd;
        let arr = this.list.filter((item) => {
          return item.otherMonth === "nowMonth";
        });
        this.monthDayStart = arr[0].date.replace(/\//g, "-");
        this.monthDayEnd = arr[arr.length - 1].date.replace(/\//g, "-");
        this.chooseDays.startDay = this.monthDayStart;
        this.chooseDays.endDay = this.monthDayEnd;
      } else {
        this.chooseDays.startDay = this.sevenDayStart.replace(/\//g, "-");
        this.chooseDays.endDay = this.sevenDayEnd.replace(/\//g, "-");
      }
      this.chooseDays.sevenDayOrMonth = flag;
      this.$forceUpdate();
      this.$emit("selectTimeRange", this.chooseDays);
    },
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay(item, index) {
      // console.log(new Date(item.date).getTime())
      // console.log(getLastYearYestdy(new Date()))
      if (new Date(item.date).getTime() < getLastYearYestdy(new Date())) {
        this.$message.warning("只能查询之前一年以内的课程");
      } else {
        // 获取月的天数
        let num = getDays(item.date);

        // 如果点击的是当前月
        if (item.otherMonth === "nowMonth" && !item.dayHide) {
          this.otherMonth = "nowMonth";
          // index+1 代表点击的数组中哪个元素（从1开始）（index代表数组下标）；
          let flag = 0;
          let obj = {};

          this.list.forEach((one, number) => {
            one.chooseDay = false;
            one.isMark = false;
            if (
              index < this.list.length &&
              flag < 7 &&
              index + flag === number
            ) {
              //  isMark 为true 表示选择的七天背景色为灰色
              one.isMark = true;
              ++flag;
              this.flower = false;
            }
            if (
              index < this.list.length &&
              (index === number || index + 6 === number)
            ) {
              //  chooseDay 为true 表示选择的七天中的第一天和最后一天背景色为蓝色高亮
              one.chooseDay = true;
              if (index === number) {
                this.startAndEndTime.beginDate = one.date.replace(/\//g, "-");
                this.startAndEndTime.beginDate2 = one.date;
                this.firstDate = one.date;
                this.sevenDayStart = one.date;
              }
              if (index + 6 === number) {
                this.startAndEndTime.endDate = one.date.replace(/\//g, "-");
                this.startAndEndTime.endDate2 = one.date;
                this.endDate = one.date;
                this.sevenDayEnd = one.date;
              }
            }
          });
        }
        // 如果是上个月
        if (item.otherMonth === "preMonth" && !item.dayHide) {
          let leftBtnUse =
            new Date(item.date).getTime() + 31536000000 >= new Date().getTime();
          if (leftBtnUse) {
            this.otherMonth = "preMonth";
            this.startAndEndTime.beginDate = item.date.replace(/\//g, "-");
            this.startAndEndTime.beginDate2 = item.date;
            this.firstDate = item.date;
            this.sevenDayStart = item.date;
            this.setEndTime(item.date);
          }
        }
        // 如果是下个月
        if (item.otherMonth === "nextMonth" && !item.dayHide) {
          this.otherMonth = "nextMonth";
          this.startAndEndTime.beginDate = item.date.replace(/\//g, "-");
          this.startAndEndTime.beginDate2 = item.date;
          this.firstDate = item.date;
          this.sevenDayStart = item.date;
          this.setEndTime(item.date);
        }

        if (item.otherMonth !== "nowMonth") {
          item.otherMonth === "preMonth"
            ? this.PreMonth(item.date)
            : this.NextMonth(item.date);
        }
      }
    },
    setEndTime(val) {
      let nextTime = getNextSeventhDay(val);
      this.startAndEndTime.endDate = nextTime.time_pointer;
      this.startAndEndTime.endDate2 = nextTime.time_pointer2;
      this.endDate = nextTime.time_pointer2;
    },
    PreMonth(date, isChosedDay = true) {
      if (this.leftBtnUse) {
        date = timeUtil.dateFormat(date);
        this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
        this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
        if (isChosedDay) {
          this.getList(this.myDate, date, isChosedDay);
        } else {
          this.getList(this.myDate);
        }

        this.showSelectDate();
      } else {
        this.$message.warning("只能查询之前一年以内的课程");
      }
    },
    NextMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");

      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }

      this.setSelectDate();
    },
    // 设置选择的日期
    setSelectDate() {
      let nextFlag = true;
      let nextIndex = 0;
      let obj = {};

      this.list.forEach((item, index) => {
        item.chooseDay = false;
        if (nextFlag) {
          ++nextIndex;
        }
        if (item.date === this.startAndEndTime.beginDate2) {
          item.chooseDay = true;
          this.firstDate = item.date;
        }
        if (
          new Date(item.date) >= new Date(this.startAndEndTime.beginDate2) &&
          new Date(item.date) <= new Date(this.startAndEndTime.endDate2)
        ) {
          item.isMark = true;
        }
        if (item.date === this.startAndEndTime.endDate2) {
          item.chooseDay = true;
          this.endDate = item.date;
          nextFlag = false;
        }
      });
    },

    // 切换左箭头时，显示已经选择的时间段的公共方法
    showSelectDate() {
      let preFIndex = 0;
      let preAdd = false;
      this.list.forEach((item, index) => {
        item.chooseDay = false;
        if (item.date === this.startAndEndTime.beginDate2) {
          preAdd = true;
          item.chooseDay = true;
          this.firstDate = item.date;
          this.sevenDayStart = item.date;
        }
        if (
          new Date(item.date) >= new Date(this.startAndEndTime.beginDate2) &&
          new Date(item.date) <= new Date(this.startAndEndTime.endDate2)
        ) {
          item.isMark = true;
        }
        if (preAdd) {
          ++preFIndex;
        }
        if (preFIndex > 7) {
          preAdd = false;
          preFIndex = 0;
        }
        if (item.date === this.startAndEndTime.endDate2) {
          item.chooseDay = true;
          this.endDate = item.date;
          this.sevenDayEnd = item.date;
        }
        if (preFIndex > 0 && preFIndex <= 7) {
          item.isMark = true;
        }
      });
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;

      let lastYearDay = getLastYearYestdy(new Date());
      this.lastYearDayTimes = lastYearDay;
      // console.log("date", date);
      this.leftBtnUse =
        new Date(date).getTime() + 31536000000 >= new Date().getTime();

      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        // k.isMark = markDate.indexOf(nowTime) > -1;

        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;

        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }

      this.list = arr;
    },
    // 返回某天是星期几
    returnDetialDay(val) {
      let timeArr = val.split("/");
      var myDate = new Date();
      myDate.setFullYear(timeArr[0], Number(timeArr[1]) - 1, timeArr[2]);
      var week = myDate.getDay();
      switch (week) {
        case 0:
          return "周日";
        case 1:
          return "周一";
        case 2:
          return "周二";
        case 3:
          return "周三";
        case 4:
          return "周四";
        case 5:
          return "周五";
        case 6:
          return "周六";
      }
    },
    // 返回选中的时间等数据
    returnSelectTime(newVal) {
      // console.log("nenewValnewValnewValwVal", newVal);
      let chDay = [];
      newVal.forEach((item) => {
        let obj = {};
        if (item.isMark) {
          // chooseDay.push(item);
          let week = this.returnDetialDay(item.date);
          obj.week = week;
          obj.dayAllStr = item.date;
          obj.dayAllStr2 = item.date.replace(/\//g, "-");
          obj.daySliceStr = item.date.slice(5);
          chDay.push(obj);
        }
      });

      if (chDay.length > 0 && chDay.length === 7 && this.sevenDayOrMonth) {
        let starT = chDay[0].dayAllStr.replace(/\//g, "-");
        let starE = chDay[6].dayAllStr.replace(/\//g, "-");
        this.chooseDays.startDay = starT;
        // 记录七天开始的时间
        this.sevenDayStart = starT;
        this.chooseDays.endDay = starE;
        // 记录七天结束的时间
        this.sevenDayEnd = starE;
        this.chooseDays.sevenDay = chDay;
        this.chooseDays.sevenDayOrMonth = true;
      }
      if (!this.sevenDayOrMonth) {
        let monthStart = getCurrentMonthFirst(this.myDate);
        let monthEnd = getCurrentMonthLast(this.myDate);
        this.chooseDays.startDay = monthStart;
        this.chooseDays.endDay = monthEnd;
        // 记录月份开始的时间
        this.monthDayStart = monthStart;
        // // 记录月份结束的时间
        this.monthDayEnd = monthEnd;
        this.chooseDays.monthDay = newVal;
        this.chooseDays.sevenDayOrMonth = false;
      }
      this.$emit("selectTimeRange", this.chooseDays);
    },
  },
  mounted() {
    this.getList(this.myDate);
    // 获取当前的时间；
    let currTime = getCurrentDay(this.myDate);
    let currMonthStart = getCurrentMonthFirst(this.myDate);
    let currMonthEnd = getCurrentMonthLast(this.myDate);
    // 获取当前时间后的第七天
    let initTime = getNextSeventhDay(this.myDate);
    this.startAndEndTime.beginDate = currTime.time_pointer;
    this.startAndEndTime.beginDate2 = currTime.time_pointer2;
    this.startAndEndTime.endDate = initTime.time_pointer;
    this.startAndEndTime.endDate2 = initTime.time_pointer2;

    this.firstDate = currTime.time_pointer2;
    this.endDate = initTime.time_pointer2;

    // 初始化时设置当前默认选中七天的第一天
    this.sevenDayStart = currTime.time_pointer;
    // 初始化时设置当前默认选中七天的最后一天
    this.sevenDayEnd = initTime.time_pointer;
    // 初始化时设置当前月份的第一天
    this.monthDayStart = currMonthStart;
    // 初始化时设置当前月份的最后一天
    this.monthDayEnd = currMonthEnd;

    // 调用方法初始化默认选中的七天
    this.showSelectDate();
  },
  computed: {},
  watch: {
    // 监听tab点击的是七天还是 月
    sevenDayOrMonth: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.copyStartAndEndTime = JSON.parse(
            JSON.stringify(this.startAndEndTime)
          );
          this.startAndEndTime.beginDate = "";
          this.startAndEndTime.beginDate2 = "";
          this.startAndEndTime.endDate = "";
          this.startAndEndTime.endDate2 = "";

          this.list.forEach((item) => {
            item.isMark = false;
            item.chooseDay = false;
          });
        } else {
          this.startAndEndTime = this.copyStartAndEndTime;
          this.firstDate = this.startAndEndTime.beginDate2;
          this.endDate = this.startAndEndTime.endDate2;
          this.setSelectDate();
        }
      },
      immediate: true,
      deep: true,
    },
    // 监听点击的是当前月还是上一个月还是下一个月
    list: {
      handler(newVal, oldVal) {
        this.returnSelectTime(newVal);
      },
      immediate: true,
      deep: true,
    },
    hasCourse: {
      handler(newVal, oldVal) {
        console.log("newValnewVal", newVal);
        // if (newVal.length > 0) {
        this.list.forEach((item) => {
          item.hasClass = false;
          newVal.forEach((one) => {
            let time = one.replace(/-/g, "/");
            if (time === item.date) {
              item.hasClass = true;
            }
          });
        });
        // }
      },
      immediate: true,
      deep: true,
    },
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true,
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true,
    },
  },
};
</script> 
  
<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: linear-gradient(135deg, #44b2fb, #1c76f7);
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    height: 25px;
    width: 25px;
  }
}
.hasClass {
  border-bottom: 4px solid #d84142;
  width: 0;
  height: 0;
  width: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 4px solid #d84142;
  position: absolute;
  bottom: 0px;
}
* {
  margin: 0;
  padding: 0;
}
.wh_container {
  max-width: 410px;
  margin: auto;
  border: 1px solid #ccc;
}
.cardBtn {
  border: 1px solid #efefef;
  border-radius: 5px;
  background: #fbfbfb;
  width: 60%;
  margin: 0 auto;
  height: 45px;
  display: flex;
  position: relative;
}
.cardBtn .btnOne {
  width: 50%;
  text-align: center;
  line-height: 40px;
  color: #a7b1b9;
  cursor: pointer;
  user-select: none;
}
.cardBtn .btnOne span {
  position: relative;
  z-index: 90;
}
.currentTime {
  box-shadow: 0px 2px 13px 0px rgba(237, 83, 83, 0.2);
  border-radius: 5px;
  color: #ed5353 !important;
  background: #ffffff;
  position: absolute;
  height: 110%;
  top: -5%;
  left: -2%;
  width: 54% !important;
  line-height: 42px !important;
  transition: all 0.5s;
}
li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  justify-content: space-between;
  padding: 4% 13% 3% 6%;
}
.wh_top_changge li {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;
}
.wh_content_li {
  cursor: auto;
  color: #777;
  font-weight: bold;
  float: left;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}
.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}
/* 被选中的日期的背景色 */
.item_one {
  background: #f4f7fe;
  display: flex;
  height: 25px;
}
.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}
.wh_content_item,
.wh_content_item_tag {
  font-size: 15px;
  width: 14%;
  text-align: center;
  color: #7d7d7d;
  position: relative;
}
.wh_top_changge li {
  font-size: 25px;
}
.wh_content_item {
  height: 40px;
}
.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.wh_item_date {
  width: 4px;
  height: 4px;
  line-height: 4px;
  font-size: 12px;
}
.wh_item_date_month {
  width: 26px;
  height: 26px;
  line-height: 30px;
  font-size: 12px;
}

.wh_content_item {
  display: flex;
  align-items: center;
}
.wh_top_tag {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_item_date {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_item_date_month {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightjt {
  display: flex;
}
.rightjt li {
  width: 16px;
}

.wh_jiantou1 {
  border-top: 2px solid #c9c9d3;
  border-left: 2px solid #c9c9d3;
  transform: rotate(-45deg);
  width: 26px;
  height: 17px;
  color: #C9C9D3!;
}
.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}
.wh_jiantou2 {
  width: 26px;
  height: 17px;
  border-top: 2px solid #c9c9d3;
  border-right: 2px solid #c9c9d3;
  transform: rotate(45deg);
  color: #c9c9d3;
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 8px;
  background: linear-gradient(135deg, #44b2fb, #1c76f7);
  color: #fff;
  font-size: 10px;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  color: #ff6767;
  border: 1px solid #e9e9ea;
  border-radius: 100px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}

.wh_content_item .wh_chose_day {
  background: linear-gradient(135deg, #44b2fb, #1c76f7);
  box-shadow: 0px 2px 7px 0px rgba(56, 94, 229, 0.41);
  color: #fff;
  border-radius: 8px;
  height: 25px;
  width: 25px;
}
</style>

