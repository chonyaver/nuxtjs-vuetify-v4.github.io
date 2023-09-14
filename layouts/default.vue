<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      fixed
      class="bg9"
      max-width="300px"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          dense
          router
          :to="item.to"
        >
          <v-list-item-title align="start" class="medium">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="d-block px-3 text-center justify-center">
          <v-btn
            v-if="!IS_AUTHENTICATED"
            color="ghostwhite"
            class="medium mx-auto"
            max-width="260px"
            light
            rounded
            block
            dense
            nuxt
            to="/login"
          >
            <v-icon color="primary">
              mdi-login
            </v-icon>
            <span class="medium ml-1 t-pink1">
              เข้าสู่ระบบ
            </span>
          </v-btn>
          <v-btn
            v-if="IS_AUTHENTICATED"
            color="black"
            class="medium mx-auto"
            max-width="260px"
            dark
            rounded
            block
            dense
            @click="logout()"
          >
            <v-icon color="accent">
              mdi-logout
            </v-icon>
            <span class="medium ml-1 t-pink2">
              ออกจากระบบ
            </span>
          </v-btn>
          <br />
          <v-btn
            color="ghostwhite"
            class="small mx-auto mb-1"
            dark
            text
            block
            dense
          >
            <small class="small">
              &copy;2023 FS-EXCHANGER
            </small>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bg-animate-light" fill-height>
      <v-container fluid>
        <Nuxt />
        <v-speed-dial
          v-model="fab"
          class="top-right mr-0"
          :direction="direction"
          :transition="transition"
        >
          <template #activator>
            <v-btn
              v-model="fab"
              color="transparent"
              elevation="0"
              class="d-flex flex rounded-r-0 align-center text-center mr-0 grad4 t-white medium"
              dark
              small
              max-width="54px"
              height="38px"
            >
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <span v-else class="t-white medium t-shadow">
                แชท
              </span>
            </v-btn>
          </template>
          <v-btn
            v-for="(speedItem, i) in speedItems"
            :key="i"
            :color="speedItem.color"
            :title="speedItem.title"
            dark
            fab
            small
            :href="speedItem.link"
            target="_blank"
          >
            <v-icon>
              {{ speedItem.icon }}
            </v-icon>
          </v-btn>
        </v-speed-dial>
      </v-container>
    </v-main>

    <v-card
      app
      dark
      elevation="12"
      class="bottom grad10 pa-1"
      width="100%"
      height="auto"
      tile
    >
      <v-card-actions
        class="d-flex px-1 py-0 justify-center align-center text-center transparent"
      >
        <v-spacer />
        <v-btn
          v-for="bMenu in bMenus"
          :key="bMenu.id"
          color="transparent"
          :title="bMenu.title"
          :class="bMenu.class"
          width="auto"
          :height="$vuetify.breakpoint.smAndDown ? '50px' : '55px'"
          dark
          depressed
          link
          router
          :to="bMenu.route"
        >
          <span
            class="d-block ma-auto px-sm-1 px-md-2 px-lg-3 px-xl-4 py-2 align-center text-center t-white medium"
          >
            <v-icon class="mx-auto mb-1" :small="$vuetify.breakpoint.smAndDown">
              {{ bMenu.icon }}
            </v-icon>
            <br />
            {{ bMenu.title }}
            <span
              v-if="bMenu.id === '5' && newCount > 0"
              class="d-flex flex align-center text-center pa-1 red t-white small"
              style="position: absolute; top: 3px; left: 51.5%; border-radius: 50%; width: auto; height: auto; max-height: 18px"
            >
              {{ newCount }}
            </span>
          </span>
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>

    <v-card
      app
      dark
      elevation="15"
      class="top grad11 py-0 px-0"
      width="100%"
      height="auto"
      tile
    >
      <v-card-actions
        class="d-flex transparent px-0 py-0 justify-center align-center text-center"
      >
        <v-btn
          color="transparent"
          class="d-flex flex rounded-l-0 ml-0 mr-auto align-center text-center grad3 t-white t-shadow medium"
          max-width="54px"
          height="38px"
          dark
          elevation="0"
          small
          @click.stop="drawer = !drawer"
        >
          <v-app-bar-nav-icon x-small />
        </v-btn>
        <div class="mx-3"></div>
        <v-spacer />
        <v-btn
          color="white"
          class="d-flex flex mx-auto my-1 py-1 px-2 align-center text-center large"
          dark
          text
          depressed
          small
        >
          {{ pageTitle }}
        </v-btn>
        <v-spacer />
        <div class="mx-3"></div>
        <v-btn
          color="transparent"
          class="d-flex flex rounded-l-0 mr-0 ml-auto align-center text-center medium"
          max-width="54px"
          height="38px"
          dark
          elevation="0"
          small
        >
          <v-app-bar-nav-icon x-small class="t-transparent" />
        </v-btn>
      </v-card-actions>
      <v-card-actions
        class="d-flex px-0 py-0 grad9 justify-center align-center text-center"
      >
        <v-spacer />
        <v-btn
          v-for="(mItem, i) in mItems"
          :key="i"
          color="transparent"
          :class="mItem.class"
          width="auto"
          :height="$vuetify.breakpoint.smAndDown ? '48px' : '53px'"
          :title="mItem.title"
          dark
          depressed
          link
          router
          :to="mItem.route"
        >
          <span
            class="d-block ma-auto px-sm-1 px-md-2 px-lg-3 px-xl-4 py-2 justify-center align-center text-center t-white medium"
          >
            <v-icon :small="$vuetify.breakpoint.smAndDown" class="mx-auto mb-1">
              {{ mItem.icon }}
            </v-icon>
            <br />
            {{ mItem.title }}
          </span>
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<style>
@font-face {
  src: url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
  font-family: "Roboto", "sans-serif";
  -moz-font-feature-settings: normal;
  -webkit-font-feature-settings: normal;
}

/* Globals */
*,
html {
  box-sizing: border-box;
}

*,
html,
body,
template {
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.0178571429em;
  word-spacing: normal;
  word-wrap: break-word;
  font-size-adjust: none;
  line-height: 1.5;
  font-feature-settings: normal;
  -moz-font-feature-settings: normal;
  -webkit-font-feature-settings: normal;
}

*[dark],
[dark],
*[dark]:below-level,
[dark]:below-level {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*[light],
[light],
*[light]:below-level,
[light]:below-level {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.top {
  position: fixed;
  top: 0;
}

.bottom {
  position: fixed;
  bottom: 0;
}

.absolute-left {
  position: fixed;
  left: 0;
  top: 76px;
}

.absolute-right {
  position: fixed;
  top: 76px;
  right: 0;
}

.top-left {
  position: fixed;
  top: 0;
  left: 0;
}

.top-right {
  position: fixed;
  top: 0;
  right: 0;
}

.top-right-m2 {
  position: fixed;
  top: 3px;
  right: 10px;
}

.bottom-right {
  position: fixed;
  bottom: 60px;
  right: 5px;
}

.pointer {
  cursor: pointer;
}

a,
.link,
nuxt-link {
  text-decoration: none;
  font-family: "Source Code Pro", "SF Mono", Monaco, Inconsolata, "Fira Mono",
    "Droid Sans Mono", monospace, monospace;
}

::placeholder,
[label],
[value],
input,
input[label],
input::placeholder,
v-text-field,
v-text-field::placeholder,
v-text-field::-ms-value,
v-text-field[label],
v-text-field[value],
v-text-field[option],
v-text-field::after,
v-text-field:below-level,
v-autocomplete,
v-autocomplete[label],
v-autocomplete::after,
v-autocomplete::selection,
v-autocomplete::placeholder,
v-autocomplete:below-level,
v-file-input,
v-file-input[label],
v-file-input[value],
v-file-input::-ms-value,
v-file-input::after,
v-file-input::placeholder,
v-file-input:below-level {
  font-size: 0.7765456789rem;
  align-items: center;
  text-align: center;
  text-justify: auto;
}

.bg4 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687439353/public/svg/bg4_f33lc3.svg");
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center top;
}

.bg6 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1689237872/public/svg/bg6.svg");
  background-size: cover;
  background-repeat: repeat-x;
  background-position: left top;
}

.bg8 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1690097207/public/svg/bg8_vbrp61.svg");
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center top;
}

.bg9 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1689159993/public/svg/bg9.svg");
  background-size: contain;
  background-repeat: repeat-x;
  background-position: left top;
}

.bg11 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1690051131/public/svg/bg11_vnhmuu.svg");
  background-size: contain;
  background-repeat: repeat-x;
  background-position: left top;
}

.bg12 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1690051131/public/svg/bg12_wnd2zl.svg");
  background-size: cover;
  background-repeat: repeat-x;
  background-position: left top;
}

.bg13 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1689256266/public/svg/bg13.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.bg10-2 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1689160831/public/svg/bg10-2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.btn3 {
  background: linear-gradient(180deg, #8e0369ff, #5b1038ff);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.background {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1689237872/public/svg/background.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

.bg-animate {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1691534265/public/svg/bg-animate.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}

.bg-animate-light {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1692065766/public/svg/bg-animate-light_jximlj.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

.bg-animate3 {
  background-size: cover;
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1692064592/public/svg/bg-animate2.svg");
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}

.bg-dialog {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1688640542/public/web/bg300-44_grzih3.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
}

.bg-dialog1 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1690787838/public/web/LINE_P20190113_154935282_5_nc3gyj.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
}

.btn-left2 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687439354/public/svg/btn-left2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center left;
}

.btn-right2 {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687439203/public/svg/btn-right2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right center;
}

.blue-pp {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687785741/public/svg/blue-pp_etvuhf.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.blue-wm {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687785741/public/svg/blue-wm_mo344u.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.red-pm {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687785741/public/svg/red-pm_tgtw2v.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.green-nt {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687785741/public/svg/green-nt_zbmo4x.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.purple-sk {
  background: url("https://res.cloudinary.com/dckrvb0rw/image/upload/v1687785741/public/svg/purple-sk_qvoroy.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.btn-line {
  width: 44px;
  height: 44px;
  background: url("https://firebasestorage.googleapis.com/v0/b/metang.appspot.com/o/public%2Fline_88.png?alt=media&token=681c35b3-6f2b-4191-a510-fe2d4e98facc");
  background-size: 44px 44px;
}

.bg-line {
  background-color: #00b900 !important;
}

.transparent {
  background-color: transparent !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.bg-light {
  background-color: ghostwhite !important;
}

.pink1 {
  background-color: #e002a5 !important;
}

.pink2 {
  background-color: #ffd5f4 !important;
}

.pink3 {
  background-color: #88286e !important;
}

.dark2 {
  background-color: black !important;
}

.dark3 {
  background: linear-gradient(180deg, #88286e8c, #111111b0);
  background-size: 100% 100%;
}

.grad1 {
  background: linear-gradient(180deg, #ffffff, #e1a5d1);
  background-size: 100% 100%;
  background-position: center top;
}

.grad2 {
  background: linear-gradient(180deg, #e002a5, #982278);
  background-size: 100% 100%;
  background-position: center top;
}

.grad3 {
  background: linear-gradient(270deg, #e1a5d11a, #e002a5);
  background-size: 100% 100%;
  background-position: left center;
}

.grad4 {
  background: linear-gradient(90deg, #e1a5d11a, #e002a5);
  background-size: 100% 100%;
  background-position: right center;
}

.grad5 {
  background: radial-gradient(at top, #e1a5d1, #88286e);
  background-size: 100% 100%;
  background-position: center top;
}

.grad6 {
  background: radial-gradient(#e002a5, #e1a5d1);
  background-size: 100% 100%;
  background-position: center center;
}

.grad7 {
  background: linear-gradient(0deg, #521943c0, #932c77c2);
  background-size: 100% 100%;
  background-position: center top;
}

.grad8 {
  background: linear-gradient(0deg, #f700b6, #88286e);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
}

.grad9 {
  background: linear-gradient(180deg, #f700b6, #88286e);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
}

.grad10 {
  background: linear-gradient(180deg, #db2bad, #2c0b25);
  background-size: 100% 100%;
  background-repeat: repeat-x;
  background-position: center bottom;
}

.grad11 {
  background: linear-gradient(0deg, #db2bad, #2c0b25);
  background-size: 100% 100%;
  background-position: center top;
  background-repeat: no-repeat;
}

.logo-compact2 {
  display: flex;
  position: absolute;
  top: 5px;
  left: 2px;
}

.btn1 {
  background: radial-gradient(at center, #ffffff, ghostwhite);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.btn2 {
  background: radial-gradient(at center, #521943, #932c77);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.btn2-2 {
  background: radial-gradient(at center, #521943c0, #932c77c2);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

/* Text and Borde */
.t-transparent {
  color: transparent !important;
}

.t-text {
  font-family: "Roboto", sans-serif;
  font-size: 0.655rem !important;
  letter-spacing: 0.0178571429em;
}

.x-small {
  font-family: "Roboto", "monospace";
  font-weight: bolder;
  font-size: 0.567rem !important;
}

.small {
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  letter-spacing: 0.0178571429em;
}

.h6 {
  font-family: "Roboto", sans-serif;
  font-size: 0.9987656789rem;
  letter-spacing: 0.0178571429em;
  font-weight: 500;
}

.large {
  font-family: "Roboto", sans-serif;
  font-size: 0.8998756789rem;
  letter-spacing: 0.0178571429em;
  font-weight: 500;
}

.medium {
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.0178571429em;
  font-weight: 300;
}

.t-btn {
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.0175em;
  font-weight: 400;
}

.t-table {
  font-family: "Droid Sans", "monospace";
  font-size: 0.7555rem !important;
  font-weight: bolder;
  letter-spacing: 0.0178571429em;
  word-spacing: 1px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.t-white {
  color: #ffffff !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.t-light {
  color: #655d62 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-light2 {
  color: #777777 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-pink1 {
  color: #e002a5 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-pink2 {
  color: #ffd5f4 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.t-pink3 {
  color: #88286e !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-blue-pp {
  color: #0072b5 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-line {
  color: #00b900 !important;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: subpixel-antialiased;
}

.t-shadow {
  text-shadow: 0px 0px 3px #11111189;
}

.bd-0 {
  border-bottom: none;
  border-top: none;
  border-right: none;
  border-left: none;
}

.bd-all {
  border-bottom: 1px solid #949092;
  border-top: 1px solid #949092;
  border-right: 1px solid #949092;
  border-left: 1px solid #949092;
}

.bd-inline {
  border-bottom: 1px solid #949092;
  border-top: 1px solid #949092;
  border-right: none;
  border-left: none;
}

.bd-t {
  border-left: none;
  border-top: 1px solid #949092;
  border-bottom: none;
  border-right: none;
}

.bd-r {
  border-bottom: none;
  border-top: none;
  border-right: 1px solid #949092;
  border-left: none;
}

.bd-b {
  border-bottom: 1px solid #949092;
  border-top: none;
  border-right: none;
  border-left: none;
}

.bd-l {
  border-top: none;
  border-left: 1px solid #949092;
  border-bottom: none;
  border-right: none;
}

.bd-rb {
  border-bottom: 1px solid #949092;
  border-top: none;
  border-right: 1px solid #949092;
  border-left: none;
}

.bd-lb {
  border-bottom: 1px solid #949092;
  border-top: none;
  border-left: 1px solid #949092;
  border-right: none;
}

.bd-rt {
  border-top: 1px solid #949092;
  border-bottom: none;
  border-right: 1px solid #949092;
  border-left: none;
}

.bd-lt {
  border-top: 1px solid #949092;
  border-bottom: none;
  border-left: 1px solid #949092;
  border-right: none;
}

.bd-4 {
  border-radius: 4px !important;
}

.bd-7 {
  border-radius: 7px;
}

.bd-50 {
  border-radius: 50%;
}

.bd-pink2 {
  border-left: 1px groove #ffd5f4;
  border-right: 1px groove #ffd5f4;
  border-top: 1px groove #ffd5f4;
  border-bottom: 1px groove #ffd5f4;
}

.shadow {
  box-shadow: 0px 3px 10px #433c40;
}

.bd-pp {
  border-top: 1px double #0072b5 !important;
  border-right: 1px double #0072b5 !important;
  border-bottom: 1px double #0072b5 !important;
  border-left: 1px double #0072b5 !important;
}

.bd-wm {
  border-top: 1px double #34568b !important;
  border-right: 1px double #34568b !important;
  border-bottom: 1px double #34568b !important;
  border-left: 1px double #34568b !important;
}

.bd-pm {
  border-top: 1px double #ec3434 !important;
  border-right: 1px double #ec3434 !important;
  border-bottom: 1px double #ec3434 !important;
  border-left: 1px double #ec3434 !important;
}

.bd-nt {
  border-top: 1px double #017b01 !important;
  border-right: 1px double #017b01 !important;
  border-bottom: 1px double #017b01 !important;
  border-left: 1px double #017b01 !important;
}

.bd-sk {
  border-top: 1px double #d46187 !important;
  border-right: 1px double #d46187 !important;
  border-bottom: 1px double #d46187 !important;
  border-left: 1px double #d46187 !important;
}

.bd-line {
  border-top: 1px double #00b900 !important;
  border-right: 1px double #00b900 !important;
  border-bottom: 1px double #00b900 !important;
  border-left: 1px double #00b900 !important;
}

.bd-tmn {
  border-top: 1px double #ff7700 !important;
  border-right: 1px double #ff7700 !important;
  border-bottom: 1px double #ff7700 !important;
  border-left: 1px double #ff7700 !important;
}

.bd-pink4 {
  border-top: 1px double #f700b6 !important;
  border-right: 1px double #f700b6 !important;
  border-bottom: 1px double #f700b6 !important;
  border-left: 1px double #f700b6 !important;
}

.grad-pp {
  background-size: 100% 100%;
  background: radial-gradient(#0072b5, #001925);
}

.grad-wm {
  background-size: 100% 100%;
  background: radial-gradient(#34568b, #011138);
}

.grad-pm {
  background-size: 100% 100%;
  background: radial-gradient(#dd2512, #910231);
}

.grad-nt {
  background-size: 100% 100%;
  background: radial-gradient(#008000, #0b3e01);
}

.grad-sk {
  background-size: 100% 100%;
  background: radial-gradient(#d2386c, #81134d);
}

@media screen and (max-width: 900px) {
  *,
  .medium {
    font-size: 85%;
  }

  .t-table {
    font-size: 83.5%;
  }
}

@media screen and (max-width: 600px) {
  *,
  .medium {
    font-size: 75%;
  }

  .t-table {
    font-size: 75%;
  }
}
</style>

<script>
export default {
  name: "DefaultLayout",

  head: {
    title: "Nuxt Vuetify Starter",
    meta: [
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
      }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      },
      {
        ref: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      },
      { ref: "stylesheet", href: "https://materialdesignicons.com/icon" }
    ]
  },

  data() {
    return {
      pageTitle: "",
      drawer: true,
      items: [
        { title: "หน้าหลัก", to: "/" },
        { title: "เกี่ยวกับเรา", to: "/about" },
        { title: "นโยบายความเป็นส่วนตัว", to: "/policies/privacy" },
        { title: "ข้อกำหนดในการให้บริการ", to: "/policies/tos" },
        { title: "ข้อกำหนดในการใช้งาน", to: "/policies/tou" },
        { title: "ข้อกำหนดและเงื่อนไข", to: "/policies/tac" },
        { title: "แหล่งที่มา", to: "/policies/attrs" },
        { title: "ข้อมูลอ้างอิง", to: "/policies/refers" }
      ],
      mItems: [
        {
          title: "หน้าหลัก",
          icon: "mdi-home",
          class:
            "d-flex flex ml-sm-1 ml-md-auto ml-lg-auto ml-xl-auto mr-0 my-1 py-1 align-center text-center medium",
          route: "/"
        },
        {
          title: "อัตราแลกเปลี่ยน",
          icon: "mdi-currency-usd",
          class: "d-flex flex mx-0 my-1 py-1 align-center text-center medium",
          route: "/currencies"
        },
        {
          title: "วิธีซื้อขาย",
          icon: "mdi-help-box",
          class:
            "d-flex flex ml-0 mr-sm-1 mr-md-auto mr-lg-auto mr-xl-auto my-1 py-1 align-center text-center medium",
          route: "/guides"
        }
      ],
      bMenus: [],
      fab: false,
      direction: "bottom",
      transition: "slide-y-reverse-transition",
      speedItems: [
        {
          color: "success",
          link: "#",
          icon: "mdi-chat",
          title: "ไลน์"
        },
        {
          color: "#0072B5",
          link: "#",
          icon: "mdi-phone",
          title: "โทรหาเรา"
        },
        {
          color: "#004a75",
          link: "#",
          icon: "mdi-facebook-messenger",
          title: "เฟสบุ๊ค เมสเซ็นเจอร์"
        },
        {
          color: "green darken-1",
          link: "#",
          icon: "mdi-whatsapp",
          title: "วอสแอป"
        },
        {
          color: "blue darken-3",
          link: "#",
          icon: "mdi-twitter",
          title: "ทวิทเตอร์"
        },
        {
          color: "blown darken-3",
          link: "#",
          icon: "mdi-email",
          title: "อีเมลล์"
        }
      ],
      newCount: 8
    };
  },

  computed: {
    IS_AUTHENTICATED() {
      return this.$store.getters.IS_AUTHENTICATED;
    },
    uid() {
      return this.$store.state.uid;
    }
  },

  mounted() {
    const name = this.$route.name;
    this.getPageTitle(name);

    this.getBMenus();
  },

  methods: {
    getPageTitle(name) {
      switch (name) {
        case "index":
          this.pageTitle = "หน้าหลัก";
          break;
        case "currencies":
          this.pageTitle = "อัตราแลกเปลี่ยน";
          break;
        case "guides":
          this.pageTitle = "วิธีซื้อขาย";
          break;
        case "login":
          this.pageTitle = "เข้าสู่ระบบ";
          break;
        case "register":
          this.pageTitle = "สมัครสมาชิก";
          break;
        case "new-order":
          this.pageTitle = "แจ้งโอน";
          break;
        case "contact":
          this.pageTitle = "ติดต่อเรา";
          break;
        case "users":
          this.pageTitle = "ศูนย์สมาชิก";
          break;
        case "orders":
          this.pageTitle = "ประวัติ";
          break;
        case "messages":
          this.pageTitle = "ข้อความ";
          break;
        case "policies":
          this.pageTitle = "นโยบายและข้อกำหนด";
          break;
        case "about":
          this.pageTitle = "เกี่ยวกับเรา";
          break;
        default:
          this.pageTitle = "";
          break;
      }
    },
    getBMenus() {
      if (this.IS_AUTHENTICATED) {
        this.bMenus = [
          {
            id: "1",
            title: "เข้าสู่ระบบ",
            icon: "mdi-login",
            class:
              "d-flex flex ml-sm-1 ml-md-auto ml-lg-auto ml-xl-auto mr-0 my-1 py-1 align-center text-center medium",
            route: "/login"
          },
          {
            id: "2",
            title: "สมัครสมาชิก",
            icon: "mdi-account-plus",
            class: "d-flex flex mx-0 my-1 py-1 align-center text-center medium",
            route: "/register"
          },
          {
            id: "3",
            title: "แจ้งโอน",
            icon: "mdi-hand-coin",
            class: "d-flex flex mx-0 my-1 py-1 align-center text-center medium",
            route: "/new-order"
          },
          {
            id: "4",
            title: "ติดต่อเรา",
            icon: "mdi-account-box",
            class:
              "d-flex flex ml-0 mr-sm-1 mr-md-auto mr-lg-auto mr-xl-auto my-1 py-1 align-center text-center medium",
            route: "/contact"
          }
        ];
      } else if (!this.IS_AUTHENTICATED) {
        this.bMenus = [
          {
            id: "5",
            title: "ศูนย์สมาชิก",
            icon: "mdi-account",
            class:
              "d-flex flex ml-sm-1 ml-md-auto ml-lg-auto ml-xl-auto mr-0 my-1 py-1 align-center text-center medium",
            route: "users"
          },
          {
            id: "6",
            title: "แจ้งโอน",
            icon: "mdi-hand-coin",
            class: "d-flex flex mx-0 my-1 py-1 align-center text-center medium",
            route: "/new-order"
          },
          {
            id: "7",
            title: "ประวัติ",
            icon: "mdi-history",
            class: "d-flex flex mx-0 my-1 py-1 align-center text-center medium",
            route: "/orders"
          },
          {
            id: "8",
            title: "ติดต่อเรา",
            icon: "mdi-account-box",
            class:
              "d-flex flex ml-0 mr-sm-1 mr-md-auto mr-lg-auto mr-xl-auto my-1 py-1 align-center text-center medium",
            route: "/contact"
          }
        ];
      }
    },
    goBack() {
      this.$router.back();
    },
    logout() {
      this.$router.replace("/");
    }
  }
};
</script>
