import Image from 'next/image';

/**
 * Coming Soon Page - Light Theme
 * Updated based on your feedback.
 */
export default function ComingSoonPage() {
  return (
    // Main Background: Switched to bg-white
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
      
      {/* Content Card: 
        - bg-gray-100 (light grey)
        - Added responsive width for mobile/desktop
      */}
      <div className="flex w-11/12 max-w-md flex-col items-center rounded-lg bg-gray-100 p-8 shadow-lg md:p-12">
        
        <div className="mb-6">
          <Image
            src="/karobar-solution-logo-full.png" // Your updated logo
            alt="Karobar Solution Logo"
            width={300} 
            height={70} 
            priority 
            // Logo ka background white hai, isliye card pe rounded corners ki zaroorat nahi
          />
        </div>

        {/* Heading: Using red from your logo for branding */}
        <h1 className="mb-3 text-center text-3xl font-bold text-red-600 md:text-5xl">
          Jald Aa Raha Hai
        </h1>
        
        {/* Text: Using your requested #333333 color */}
        <p className="text-center text-lg text-[#333333] md:text-xl">
          Aapka business sambhalne ke liye behtareen solution.
        </p>
      </div>
    </main>
  );
}


