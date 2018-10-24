const DESCRIPTION_DATE = {
  'classes_start': 'Monday, August 20th',
  'classes_end': 'Friday, December 7th',
  'student_reg_deadline': 'Sunday, August 19th',
  'drop_deadline': 'Saturday, August 25th',
  'add_deadline': ' Sunday, August 26 at 11:59 p.m. Eastern Time',
  'finals_week_ends': 'Friday, December 14',
  'withdrawl_deadline_ends': 'Friday, December 7th',
  'finals_week_begins': 'Monday, December 10th',
  'withdrawal_deadline_ends': 'Friday, December 7th',
  'declare_minor_deadline': 'Friday, November 9th',
  'late_drop_deadline': 'Friday, November 9th',
  'final_exam_conflict': 'Sunday, October 14th',
  'late_drop_begins': 'Sunday, August 26th',
  'late_registration_begins': 'Monday, August 27th',
  'final_exams': 'Monday, December 10th through Friday, December 14th',
  'thanksgiving_break': 'Sunday, November 18th through Saturday, November 24th'
};

const BUS_ID_TO_NAME = {
  'park_forest': {'name': 'A - Park Forest', 'routeId': 1},
  'boalsburg': {'name': 'B - Boalsburg', 'routeId': 4},
  'houserville': {'name': 'C - Houserville', 'routeId': 7},
  'n_route': {'name': 'N - Martin St / Aaron Dr', 'routeId': 22},
  'pine_grove': {'name': 'F - Pine Grove', 'routeId': 10},
  'hp_route': {'name': 'HP - Toftrees / Scenery Park', 'routeId': 13},
  'nittany_mall': {'name': 'M - Nittany Mall', 'routeId': 19},
  'tussey_mt': {'name': 'P - Tussey Mt', 'routeId': 26},
  'vario_blvd': {'name': 'V - Vairo Blvd', 'routeId': 43},
  'waupelani': {'name': 'R - Waupelani Dr', 'routeId': 31},
  'special': {'name': 'Special', 'routeId': 12},
  'cato_park': {'name': 'K - Cato Park', 'routeId': 16},
  'valley_vista': {'name': 'W - Valley Vista', 'routeId': 46},
  'bellefonte': {'name': 'X.B. - Bellefonte', 'routeId': 49},
  'white_loop': {'name': 'White Loop', 'routeId': 57},
  'blue_loop': {'name': 'Blue Loop', 'routeId': 55},
  'university_terrace': {'name': 'U.T. - University Terrace', 'routeId': 40},
  'red_link': {'name': 'Red Link', 'routeId': 51},
  'science_park': {'name': 'S - Science Park', 'routeId': 37},
  'nv_route': {'name': 'N.V. - Martin St / Vairo Blvd', 'routeId': 25},
  'football_shuttle': {'name': 'Downtown Football Shuttle', 'routeId': 62},
  'green_link': {'name': 'Green Link', 'routeId': 53},
  'stormstown': {'name': 'G - Stormstown', 'routeId': 11},
  'airport': {'name': 'A.P. - University Park Airport', 'routeId': 14},
  'z_route': {'name': 'Z - Stormstown', 'routeId': 56},
  'vairo_express': {'name': 'V.E. - Vairo Blvd Express', 'routeId': 42},
  'ne_route': {'name': 'N.E. - Martin St / Aaron Dr Express', 'routeId': 21},
  'south_atherton_football': {'name': 'South Atherton Football Shuttle', 'routeId': 64},
  'rp_route': {'name': 'R.P. - Waupelani - Downtown', 'routeId': 34},
  'pleasant_gap': {'name': 'X.G. - Pleasant Gap', 'routeId': 50},
  'rc_route': {'name': 'R.C. - Waupelani Drive - Campus', 'routeId': 33},
  'valley_vista_express': {'name': 'W.E. - Valley Vista Express', 'routeId': 45},
  'vn_route': {'name': 'V.N. - Toftrees Vairo Martin', 'routeId': 44},
  'toftrees_express': {'name': 'H.C. - Toftrees Express', 'routeId': 61},
  'hm_route': {'name': 'H.M. - Toftrees/Nittany Mall', 'routeId': 60}
};

const STOP_ID_TO_NAME = {
  'college_avenue_at_allen_street': {'name': 'College Avenue at Allen Street', 'stopId': 1},
  'burrowes_road_at_deike_building': {'name': 'Burrowes Road at Deike Building', 'stopId': 2},
  'burrowes_road_at_waring_commons': {'name': 'Burrowes Road at Waring Commons', 'stopId': 3},
  'pattee_transit_center_eastbound': {'name': 'Pattee Transit Center Eastbound', 'stopId': 4}
};

module.exports = {
  DESCRIPTION_DATE,
  STOP_ID_TO_NAME,
  BUS_ID_TO_NAME,
  APP_ID: 'amzn1.ask.skill.7f38e6e1-9c0c-464a-b950-c07c5e174084',
  WELCOME_MESSAGE: 'Welcome to P.S.U Helper, you can ask me different questions about Penn State!',
  SKILL_NAME: 'Happy Valley Helper',
  HELP_MESSAGE: 'You can ask me questions about Happy Valley, or you can say exit... What can I help you with?',
  HELP_REPROMPT: 'What can I help you with?',
  STOP_MESSAGE: 'Goodbye!'
};
