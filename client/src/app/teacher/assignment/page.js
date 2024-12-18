'use client'
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = {
	page: {
		marginLeft: '5rem',
		marginRight: '5rem',
		backgroundColor: 'white',
   
	},

	columnLayout: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '3rem 0 5rem 0',
		gap: '2rem',
	},

	column: {
		display: 'flex',
		flexDirection: 'column',
	},

	spacer2: {
		height: '2rem',
	},

	fullWidth: {
		width: '5%',
	},

	marginb0: {
		marginBottom: 0,
	},
  introText:{
    fontWeight: 'bold'
  }
};


const MyDocument = () => (
 <>

 <p>Type your questions:</p>
<input className='text-white m-4'/>
<input className='text-white m-4'/>
<input className='text-white m-4'/>
<input className='text-white m-4'/>
<input className='text-white m-4'/>
<input className='text-white m-4'/>


  <Document>
    <Page size="A4" style={styles.page}>
    <div >
				<div>
					<h1 style={styles.introText}>
						SIKSHALAYA - ASSIGNMENTS
					</h1>
				</div>

				<div style={styles.spacer2}></div>

				<img style={styles.fullWidth} src="/logo.png" />
			</div>

			<div style={styles.page}>
				<div>
					<h2 style={styles.introText}>
						Report Heading That Spans More Than Just One Line
					</h2>
				</div>

				<div style={styles.columnLayout}>
					<div style={styles.column}>
						<img style={styles.fullWidth} src="photo-2.png" />
						<h4 style={styles.marginb0}>Subtitle One</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>

					<div style={styles.column}>
						<img style={styles.fullWidth} src="photo-1.png" />
						<h4 style={styles.marginb0}>Subtitle Two</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>
				</div>

				<div style={styles.columnLayout}>
					<div style={styles.column}>
						<img style={styles.fullWidth} src="photo-3.png" />
						<h4 style={styles.marginb0}>Subtitle One</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>

					<div style={styles.column}>
						<img style={styles.fullWidth} src="photo-4.png" />
						<h4 style={styles.marginb0}>Subtitle Two</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>
				</div>
			</div>
    </Page>
  </Document>
 
 </>
);

export default MyDocument