<script lang="ts">
  import { user } from '../../store/index'
  import { createForm } from 'svelte-forms-lib'
  import type { ILoginForm, ILoginResponse } from './login.interface'
  import { Login } from './login.api'
  import * as yup from 'yup'

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(3)
    }),
    onSubmit: async (values: ILoginForm) => {
      const response = await Login(values)
      if (response._tag === 'Right') console.log('SUCCESS', response.right.userId)
    }
  })
</script>

<!-- prettier-ignore -->
<template lang="pug">
	h1 hello
	form(on:submit|preventDefault='{handleSubmit}')
		label(for='title') title
		input(id='name' name='name' on:change='{handleChange}' bind:value='{$form.name}')
		+if('$errors.name')
			p {$errors.name}
</template>
