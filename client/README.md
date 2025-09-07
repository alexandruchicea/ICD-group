# ICD GROUP Website

A modern, responsive website for ICD GROUP, showcasing their real estate development and energy solutions projects. Built with Angular 17 and TypeScript.

## Features

- **Modern Design**: Clean, professional design inspired by Sunvest
- **Responsive Layout**: Fully responsive design that works on all devices
- **Project Portfolio**: Showcase of completed real estate projects with images
- **Energy Solutions**: Dedicated section for photovoltaic parks and BESS systems
- **Contact Form**: Interactive contact form for partnership inquiries
- **Mobile Navigation**: Hamburger menu for mobile devices

## Pages

1. **Home** - Company overview and strategic divisions
2. **About** - Company history, mission, and vision
3. **Energy Solutions** - Photovoltaic parks and BESS systems
4. **Portfolio** - Completed real estate projects
5. **Partnership** - Partnership opportunities
6. **Contact** - Contact information and inquiry form

## Technologies Used

- Angular 17
- TypeScript
- CSS3 with CSS Grid and Flexbox
- Responsive Design
- Modern Web Standards

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:4200`

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   ├── about/
│   │   ├── energy-solutions/
│   │   ├── portfolio/
│   │   ├── partnership/
│   │   └── contact/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
│   └── images/
├── styles.css
└── main.ts
```

## Portfolio Projects

The website showcases the following completed projects:

1. **Petru Rares Residence** (2020) - Premium Residential
2. **Dr Felix** (2016) - Premium Residential
3. **Smart City Residence 1,2,3** (2014-2018) - Modern Residential
4. **Roua Residence Appartments** (2012) - Residential
5. **Ela Cotroceni** (2023) - Residential
6. **Bastiliei** (2022) - Office
7. **Razoare** (2022) - Industrial/Office
8. **Ghermanesti** (2023) - Commercial
9. **Tarlungeni** (2025) - Commercial
10. **Dragalina** (2021) - Aparthotel

## Customization

### Colors
The website uses CSS custom properties for easy color customization. Main colors are defined in `src/styles.css`:

- Primary: `#1a5f7a`
- Secondary: `#2c88a0`
- Accent: `#f39c12`

### Images
To add your own project images:
1. Place images in `src/assets/images/`
2. Update the image paths in `portfolio.component.ts`

## Contact Information

- **Address**: Str Petru Rares 5-9 sc 2 ap 7, Sector 1, Bucuresti
- **Phone**: 0742.22.66.88
- **Business Hours**: Monday - Friday: 9:00 - 18:00, Saturday: 9:00 - 14:00

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary to ICD GROUP.
