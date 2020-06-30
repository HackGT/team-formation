const rawSchools = ["Georgia Institute of Technology",
"Abraham Baldwin Agricultural College",
"Albany Medical College",
"Albany State University",
"Arizona State University",
"Armstrong State University",
"Atlanta Metropolitan State College",
"Auburn University",
"Augusta University",
"Bainbridge State College",
"Baylor College of Medicine",
"Baylor University",
"Binghamton University",
"Boston College",
"Boston University",
"Bowling Green State University",
"Brandeis University",
"Brigham Young University",
"Brown University",
"California Institute of Technology",
"Carnegie Mellon University",
"Case Western Reserve University",
"City College of New York",
"Clark Atlanta University",
"Clarkson University",
"Clayton State University",
"Clemson University",
"College of Coastal Georgia",
"College of William and Mary",
"Colorado School of Mines",
"Colorado State University",
"Columbia University",
"Columbus State University",
"Cornell University",
"Creighton University",
"Dalton State College",
"Dartmouth College",
"Darton State College",
"Drexel University",
"Duke University",
"East Carolina University",
"East Georgia State College",
"Emory University",
"Florida Atlantic University",
"Florida Institute of Technology",
"Florida International University",
"Florida State University",
"Fort Valley State University",
"George Mason University",
"George Washington University",
"Georgetown University",
"Georgia College & State University",
"Georgia Gwinnett College",
"Georgia Highlands College",
"Georgia Southern University",
"Georgia Southwestern State University",
"Georgia State University",
"Gordon State College",
"Harvard University",
"Howard University",
"Hunter College",
"Icahn School of Medicine at Mount Sinai",
"Illinois Institute of Technology",
"Indiana University - Bloomington",
"Indiana University-Purdue University Indianapolis",
"Iowa State University",
"Johns Hopkins University",
"Kansas State University",
"Kennesaw State University",
"Kent State University",
"Lehigh University",
"Loma Linda University",
"Louisiana State University",
"Louisiana Tech University",
"Loyola University Chicago",
"Marquette University",
"Massachusetts Institute of Technology",
"Medical College of Wisconsin",
"Medical University of South Carolina",
"Miami University",
"Michigan State University",
"Michigan Technological University",
"Middle Georgia State University",
"Mississippi State University",
"Missouri University of Science and Technology",
"Montana State University",
"Morehouse College",
"New Jersey Institute of Technology",
"New Mexico State University",
"New York Medical College",
"New York University",
"North Carolina State University",
"North Dakota State University",
"Northeastern University",
"Northern Arizona University",
"Northern Illinois University",
"Northwestern University",
"Oakland University",
"Ohio State University",
"Ohio University",
"Oklahoma State University",
"Old Dominion University",
"Oregon Health & Science University",
"Oregon State University",
"Pennsylvania State University",
"Portland State University",
"Princeton University",
"Purdue University",
"Queens College, City University of New York",
"Rensselaer Polytechnic Institute",
"Rice University",
"Rochester Institute of Technology",
"Rockefeller University",
"Rush University",
"Rutgers University",
"Saint Louis University",
"San Diego State University",
"San Francisco State University",
"Savannah State University",
"South Georgia State College",
"Southern Illinois University Carbondale",
"Southern Methodist University",
"Spelman College",
"Stanford University",
"Stony Brook University",
"Syracuse University",
"Temple University",
"Texas A&M University",
"Texas Tech University",
"The Catholic University of America",
"Thomas Jefferson University",
"Tufts University",
"Tulane University",
"Uniformed Services University of the Health Sciences",
"University at Albany, SUNY",
"University at Buffalo",
"University of Akron",
"University of Alabama - Tuscaloosa",
"University of Alabama at Birmingham",
"University of Alabama in Huntsville",
"University of Alaska Fairbanks",
"University of Arizona",
"University of Arkansas - Fayetteville",
"University of California, Berkeley",
"University of California, Davis",
"University of California, Irvine",
"University of California, Los Angeles",
"University of California, Merced",
"University of California, Riverside",
"University of California, San Diego",
"University of California, San Francisco",
"University of California, Santa Barbara",
"University of California, Santa Cruz",
"University of Central Florida",
"University of Chicago",
"University of Cincinnati",
"University of Colorado Boulder",
"University of Connecticut",
"University of Dayton",
"University of Delaware",
"University of Denver",
"University of Florida",
"University of Georgia",
"University of Hawaii at Manoa",
"University of Houston",
"University of Idaho",
"University of Illinois at Chicago",
"University of Illinois at Urbana–Champaign",
"University of Iowa",
"University of Kansas",
"University of Kentucky",
"University of Louisville",
"University of Maine",
"University of Maryland, Baltimore",
"University of Maryland, Baltimore County",
"University of Maryland, College Park",
"University of Massachusetts Amherst",
"University of Massachusetts Boston",
"University of Massachusetts Lowell",
"University of Memphis",
"University of Miami",
"University of Michigan",
"University of Minnesota",
"University of Mississippi",
"University of Missouri–Columbia",
"University of Missouri–Kansas City",
"University of Missouri–St. Louis",
"University of Montana",
"University of Nebraska–Lincoln",
"University of Nevada, Las Vegas",
"University of Nevada, Reno",
"University of New Hampshire",
"University of New Mexico",
"University of New Orleans",
"University of North Carolina at Chapel Hill",
"University of North Carolina at Charlotte",
"University of North Carolina at Greensboro",
"University of North Dakota",
"University of North Georgia",
"University of North Texas",
"University of Notre Dame",
"University of Oklahoma",
"University of Oregon",
"University of Pennsylvania",
"University of Pittsburgh",
"University of Rhode Island",
"University of Rochester",
"University of South Alabama",
"University of South Carolina",
"University of South Florida",
"University of Southern California",
"University of Southern Mississippi",
"University of Tennessee, Knoxville",
"University of Texas MD Anderson Cancer Center",
"University of Texas at Arlington",
"University of Texas at Austin",
"University of Texas at Dallas",
"University of Texas at El Paso",
"University of Texas at San Antonio",
"University of Toledo",
"University of Toronto",
"University of Utah",
"University of Vermont",
"University of Virginia",
"University of Washington",
"University of Waterloo",
"University of West Georgia",
"University of Wisconsin–Madison",
"University of Wisconsin–Milwaukee",
"University of Wyoming",
"Utah State University",
"Valdosta State University",
"Vanderbilt University",
"Virginia Commonwealth University",
"Virginia Polytechnic Institute and State University",
"Wake Forest University",
"Washington State University",
"Washington University in St. Louis",
"Wayne State University",
"Wesleyan University",
"West Virginia University",
"Wright State University",
"Yale University",
"Yeshiva University"];

const schools = rawSchools.map((current, index) => {
    return {
        key: index,
        text: current,
        value: current
    }
})

export default schools;