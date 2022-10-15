<template>
  <div class="footer bg-primary py-2">
    <div class="container">
      <div class="row">
        <div class="mx-auto">
          <div class="row mt-4 reverse">
            <div class="col-lg-7 map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.781690669643!2d139.71078791524815!3d35.73158718018263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d670d1a305f%3A0x70a1288e7cf0f33f!2zQmljIENhbWVyYSDmsaDooovmnKzlupc!5e0!3m2!1szh-TW!2stw!4v1663374895131!5m2!1szh-TW!2stw" width="450" height="350" style="border:0;border-radius: 2px;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-100 map"/>
            </div>
            <div class="col-lg-5 my-auto px-0">
              <div class="footerInfo text-center">
                <img src="~@/assets/img/logo.svg" alt="logo"/>
                <div class="footerInfo-content">
                  <p>{{ $t('Footer.address') }}</p>
                  <p>{{ $t('Footer.tel') }}
                    <a href="tel:+03-5396-1111">03-5396-1111</a>
                  </p>
                  <p class="pb-4">{{ $t('Footer.open-time') }}</p>
                  <a href="#" @click.prevent><font-awesome-icon icon="fab fa-twitter" class="icon twitter" /></a>
                  <a href="#" @click.prevent><font-awesome-icon icon="fa-brands fa-facebook" class="icon facebook" /></a>
                  <a href="#" @click.prevent><font-awesome-icon icon="fa-brands fa-line" class="icon line" /></a>
                  <a href="#" @click.prevent><font-awesome-icon icon="fa-brands fa-square-instagram" class="icon instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyRight">
          <p>© Copyright 2022 Big Game</p>
          <p>個人練習作品，非商業用途</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
