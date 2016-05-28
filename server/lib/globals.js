/*
**
**  # <- configuration of server side packages
**
*/

globals = {
  productionWebsiteUrl : 'https://www.grownout.com/',
  adminWebsite : 'http://admin.grownout.com/',
  elasticIndexName : 'profiles',
  elasticServerOptions : {
    host: 'prod-es1.grownout.com',
    port: 6200
  },
  suggestionElasticServerOptions : {
    host: 'test-es1.grownout.com',
    port: 6200
  },
  employeeIndexName :"complete",
  elasticEmployeeOptions : {
    host: 'dev-es1.grownout.com',
    port: 6200
  },
  esBaseUrl : 'http://prod-es1.grownout.com:6200/',
  gcsBucket : 'https://storage.googleapis.com/grownout-premium/v2/',
  gcsBucketStringToReplace : 'https://grownout-premium.storage.googleapis.com/v2/',
  perPage : 20,
  gReferSecret: 'r3f3rs3cret',
  gHMApprovalSecret: '8MR5V95W3A14',
  gApplyJobSecret: '@pp1yj06s3cret',
  gcsImagePath: 'https://storage.googleapis.com/media.grownout.com/v2',
  passwordReset : 'r5sE20p115',
  gEncryptAmoebaId: '6s9db90wba3a4',
  gadminLoginSecret: '7r0wn0u20a4m5',
  premiumAdminAuth : {
    key : 'Gr0wn0ut',
    text : 'gr0wn0utprem5um1dm5n'
  },
  globalEducationObj : {
    1: "Doctoral",
    2: "Postgraduate",
    3: "Undergraduate",
    4: "Graduate",
    5: "Professional",
    6: "Diploma",
    7: "Postgraduate Diploma",
    8: "Associate"
  },
  plan : {
    0 : {                     // SMB package                    
      job : 100,
      recruiter : 5
    },
    1 : {                     // Corporate package
      job : -1, // infinite
      recruiter : 10
    },
    2 : {                     // Enterprise package
      job : -1, // infinite
      recruiter : -1
    }
  }
}



var env = process.env.env_mode
console.log('Environment(env_mode) set is:', env)

if(env == 'production'){

  console.log('Intializing variable for production')

  globals.kadiraAppId = 'zvFuQ6RwfxhQHfezN'
  globals.kadiraAppSecret = '95e087f4-29e0-423b-80fd-1011a2386365'
  globals.pythonElasticApi = 'http://localhost:7000/'
  globals.website = 'http://app.grownout.com/'
  globals.mixpanelToken = '7c5f3f7677a04ca73d4ebd96aece637d'

}
else if(env =='staging'){

  console.log('Intializing variable for staging')

  globals.kadiraAppId = '8bGbrM44Y2kpfQvx3'
  globals.kadiraAppSecret = '083d1ab7-3776-4c5d-a0be-e71df2a7fc61'
  globals.pythonElasticApi = 'http://localhost:7000/'
  globals.website = 'http://staging.grownout.com/'
  globals.mixpanelToken = 'e0028da70bf1fa913109ff0f9b209b8d'

}
else{

  console.log('Intializing variable for local')
  
  globals.kadiraAppId = 'cDYKMJB5epkbTa2jZ'
  globals.kadiraAppSecret = '13261b10-ad0a-4927-82e4-c8cfe34f6e76'
  globals.pythonElasticApi = 'http://104.155.199.31:7000/'
  globals.website = process.env.ROOT_URL || 'http://localhost:3000/'
  globals.mixpanelToken = 'e0028da70bf1fa913109ff0f9b209b8d'
}

imp_people_des = ['AGM-HR',
  'AM-HR',
  'AM-Human Resource',
  'Asia Pacific - Head HR',
  'Ass. Manager-HR',
  'Ass.Director HR',
  'Ass.Director-HR',
  'Assistant General Manager-HR',
  'Assistant Manager HR',
  'Assistant Manager-HR',
  'Assistant Vice President HR',
  'Associate Director - HR',
  'Associate Director - Human Resource',
  'Associate Director HR',
  'Associate Director-HR',
  'Associate HR',
  'Associate Human Resource ',
  'Associate Recruitment',
  'Asst Director HR',
  'Asst Manager-HR ',
  'Asst Manager-HR TA',
  'Asst Manager-Human Resource ',
  'Asst. Director HR',
  'AVP - HR & Admin',
  'AVP & Head - Human Resources',
  'AVP & Head HR',
  'AVP- HR & Operations',
  'AVP-HR',
  'C.C.O',
  'C.E.O',
  'C.F.O',
  'C.I.O',
  'C.O.O',
  'C.P.O',
  'C.T.O',
  'CCO',
  'ceo',
  'CFO',
  'Chief Compliance Officer',
  'Chief Executive Officer',
  'Chief Financial Officer',
  'Chief Human Resource Officer',
  'Chief Information officer',
  'Chief Operating Officer',
  'Chief People Officer',
  'Chief Technology Officer',
  'chro',
  'CHRO & Head of Corporate Affairs',
  'CIO',
  'Co Founder',
  'Co-Founder',
  'Competency Specialist',
  'COO',
  'Corporate HR Manager',
  'Corporate Manager HR ',
  'Country Recruitment Manager',
  'cpo',
  'CTO',
  'Deputy Director Staffing',
  'Deputy General Manager - HR',
  'Deputy General Manager (DGM), Corporate HR',
  'Deputy General Manager HR',
  'Deputy General Manager HR/IR/General Affiars',
  'Deputy Manager HR',
  'DGM-HR',
  'Director - HR & Talent',
  'Director HR',
  'Director-HR',
  'Director-Sourcing',
  'Director/CHRO',
  'Dy Director Staffing',
  'Dy Manager HR',
  'Dy. General Manager-HR',
  'Dy.Director Staffing',
  'Dy.Manager HR',
  'Dy.Staffing Director',
  'Executive HR',
  'Executive-HR',
  'Founder',
  'General Manager - Human Resources',
  'General Manager (HR)',
  'General Manager Human Resources',
  'General Manager-HR',
  'General Manager-Human Resources',
  'Global Head Resourcing',
  'Global Head-HR',
  'Global Head-Human Resource',
  'Global Head-Resourcing ',
  'Global HR Head',
  'Global HR-Head',
  'GM-HR',
  'Group Manager - Talent Management',
  'Group Manager Talent Management',
  'Head - HR',
  'Head - Staffing',
  'Head HR',
  'head hr and recruitment',
  'Head HR-Asia Pacific ',
  'Head HRM',
  'Head of Learning & Organizational Development',
  'Head of Organizational Development',
  'Head of Talent & Organizational Development',
  'Head Resourcing',
  'Head Staffing',
  'Head TA',
  'Head TA and Global Mobility',
  'Head Talent Acquisiton',
  'Head Talent Acqusition and Global Mobility',
  'Head- Talent Acqusition and Global Mobility',
  'Head-Human Resource Manager',
  'HR Associate',
  'HR Deputy Manager ',
  'HR Director',
  'HR Executive',
  'HR Head',
  'HR Lead',
  'HR Leader',
  'HR Manager',
  'HR Trainee',
  'HR-Executive',
  'HR-Global Head',
  'HR-Head',
  'HR-LEAD',
  'HR-Regional Manager',
  'HRM Head ',
  'Human Resource Associate',
  'Human Resource Lead ',
  'Human Resource Leader',
  'Human Resource Manager',
  'Human Resource Manager Head',
  'Human Resource-Global Head',
  'Human Resources V.P',
  'Human Resources VP',
  'L&D leader',
  'Lead - Recruitment',
  'Lead - Resourcing',
  'Lead HR',
  'Lead Human Resource',
  'Lead Resourcing',
  'Lead Staffing',
  'Lead TA',
  'Lead Talent Acquisition',
  'LEAD-HR',
  'Leader HR',
  'Leader Human Resource',
  'Leader L&D',
  'Leadership TA',
  'Leadership Talent Acquisition',
  'Leadership-TA',
  'Leadership-Talent Acquisition',
  'Learning & Development Leader',
  'M.D',
  'Manager  Corporate HR',
  'Manager - Corporate HR',
  'Manager - Human Capital',
  'Manager HR',
  'Manager Human Capital',
  'Manager Human Resource',
  'Manager Recruitment ',
  'Manager TA',
  'Manager Talent Acquisition',
  'Manager Talent Management',
  'Manager- Talent Management',
  'Manager-TA',
  'Manager-Talent Acquisition',
  'Managing Director',
  'MD',
  'Practice Manager Leadership Hiring',
  'Recruiter',
  'Recruitment Associate',
  'Recruitment Manager',
  'Regional HR Manager',
  'Regional Manager-HR',
  'Resourcing Global Head ',
  'Resourcing Head',
  'Resourcing Lead',
  'Resourcing-Global Head ',
  'Senior Competency Specialist',
  'Senior HR Manager',
  'Senior HR Professional',
  'Senior Manager HR',
  'Senior Manager-HR',
  'Sourcing Director',
  'Specialist TA',
  'Specialist Talent Acquisition',
  'Specialist-TA',
  'Sr Executive HR',
  'Sr Executive-HR',
  'Sr. HR',
  'Sr. HR Professional',
  'Sr. Human Resource',
  'Staffing - Head',
  'Staffing Head',
  'Staffing Lead',
  'TA Head',
  'TA Lead',
  'Talent Acquisition Manager',
  'Talent Acquisiton Head',
  'Talent Management Manager',
  'Talent Management-Manager',
  'Team Lead Recruitment',
  'Technical Recruiter',
  'Trainee HR',
  'Trainee-HR',
  'Vice President & Head - Human Resource & Admin',
  'Vice President HR',
  'Vice president HR operations',
  'Vice President-HR',
  'VP HR Operations',
  'VP Human Resource',
  'VP-HR',
  'VP-HR operations',
  'VP-Human Resource'
]