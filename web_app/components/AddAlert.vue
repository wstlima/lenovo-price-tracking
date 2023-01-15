<template>
  <div class="w-full max-w-md flex flex-col self-center">
    <form
      @submit.prevent="add"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="product_name"
          >Product</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product_name"
          type="text"
          placeholder="Lenovo V110-15ISK"
          required
          v-model="product_name"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="product_url"
          >Product URL</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product_url"
          type="text"
          placeholder="https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops"
          required
          v-model="product_url"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="price"
          >Price</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          placeholder="1000"
          required
          v-model="price"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="delay"
          >Delay between each price check (in hours)</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="delay"
          type="number"
          placeholder="2"
          required
          v-model="delay"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-5"
          type="submit"
        >
        schedule
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddAlert",
  data() {
    return {
      product_name: 'Lenovo V110-15ISK',
      product_url: 'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops',
      price: 1000,
      delay: 2
    };
  },
  methods: {
    add() {

      if (!this.product_url.includes("webscraper")) {
        this.$emit("show-alert", {
          type: "error",
          message: "The product url should be an webscraper url"
        });
        return null;
      }

      const payload = {
        name: this.product_name,
        url: this.product_url,
        price: this.price,
        delay: this.delay
      };

      this.post('/api/alert', payload);

      this.$emit("show-alert", {
        type: "success",
        message: `Alert on ${this.product_name} at ${this.price} created!`
      });

      // reset initial state
      Object.assign(this.$data, this.$options.data());
    },
    post(url, payload) {
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
  }
};
</script>
