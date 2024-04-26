<template>
  <div class="flex flex-row gap-5 p-5 align-middle min-w-full">
    <div class="shadow-2xl rounded-full bg-white h-16 aspect-square p-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
        <path
          fill="currentColor"
          d="M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.064 192.064 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193.235 193.235 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0M256 448a128 128 0 1 0 0 256zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128"
        ></path>
      </svg>
    </div>
    <div class="shadow-2xl p-4 text-white rounded-3xl align-middle w-fit bg-ut-orange">
      <!-- Use a span element to wrap each character for animation -->
      <span
        v-for="(char, index) in typedDescription"
        :key="index"
        :class="{ 'typing-animation': index < currentIndex }"
        >{{ char }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  // Props received by the component
  props: ['description'],
  // Data properties for the component
  data() {
    return {
      // Initialize data properties
      typedDescription: '', // String to hold typed description
      currentIndex: 0, // Index to track current character being typed
      typingSpeed: 1000 // Typing speed in milliseconds
    };
  },
  // Lifecycle hook called when the component is mounted
  mounted() {
    // Call method to simulate typing the description
    this.typeDescription();
  },
  // Methods for the component
  methods: {
    // Method to simulate typing the description
    typeDescription() {
      // Set interval to type characters
      const interval = setInterval(
          () => {
            // Check if there are characters left to type
            if (this.currentIndex < this.description.length) {
              // Append next character to typedDescription and increment currentIndex
              this.typedDescription += this.description[this.currentIndex];
              this.currentIndex++;
            } else {
              // Stop typing when all characters are typed
              clearInterval(interval);
            }
          },
          // Calculate interval duration based on typing speed and description length
          parseInt(this.typingSpeed / this.description.length)
      );
    }
  }
};
</script>


<style scoped>
.typing-animation {
  animation: typing-blink 0.7s infinite; /* Example of a blinking cursor animation */
}

@keyframes typing-blink {
  50% {
    border-color: transparent;
  }
}
</style>
