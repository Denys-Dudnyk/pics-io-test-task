import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
// import Header from './components/Header'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from '@mui/material'
import '../src/styles/global.scss'
import { Toaster } from 'react-hot-toast'

const theme = createTheme()

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth='md' className='container'>
					<h1 className='title'>
						Comments<span>APP</span>
					</h1>
					<CommentForm />
					<CommentList />
				</Container>
				<Toaster
					position='top-right'
					reverseOrder={false}
					toastOptions={{
						style: {
							background: '#1d1d1d',
							color: '#fc0',
						},
						success: {
							iconTheme: {
								primary: '#fc0',
								secondary: 'black',
							},
						},
					}}
				/>
			</ThemeProvider>
		</Provider>
	)
}

export default App
