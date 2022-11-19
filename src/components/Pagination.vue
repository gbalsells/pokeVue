<template lang="">
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button class="page-link" @click="$emit('navigateTo' , 1)" :disabled="currentPage === 1">
          First
        </button>
      </li>
      <li class="page-item">
        <button class="page-link page-number" @click="$emit('navigateTo' , currentPage - 2)" v-if="currentPage > 2">
          {{ currentPage - 2 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link page-number" @click="$emit('navigateTo' , currentPage - 1)" v-if="currentPage > 1">
          {{ currentPage - 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link page-number current">
          {{ currentPage }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link page-number" @click="$emit('navigateTo' , currentPage + 1)" v-if="currentPage < pages">
          {{ currentPage + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link page-number" @click="$emit('navigateTo' , currentPage + 2)" v-if="currentPage < pages - 1">
          {{ currentPage + 2 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="$emit('navigateTo' , pages)" :disabled="currentPage === pages">
          Last
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['currentPage', 'pages'],
}
</script>

<style>
.pagination {
  margin: 2em;
  float: right;
}

.current {
  font-weight: bold;
}

.page-number {
  width: 3rem;
}

button:focus {
  background: inherit;
  box-shadow: none;
}

button:hover {
  background: #E9ECEF;
  box-shadow: 0 0 10px #BFDBFD;
}

button:disabled {
  background: inherit;
  color: gray;
}

button:disabled:hover {
  background: white;
  color: gray;
  box-shadow: none;
}
</style>