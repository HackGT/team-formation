import { IUserMongoose } from "../../../types";
import { User } from "../../../models"

const getUsers = async function (
  parent,
  args,
  context,
  info,
  req
): Promise<IUserMongoose[] | null> {
  let users: IUserMongoose[];
  let search: String;
  let skills: String[];
  let grad_years: String[];
  let schools: String[];
  let skillSearch = [] as {}[];
  let yearSearch = [] as {}[];
  let schoolSearch = [] as {}[];

  let andQuery = [] as any;
  console.log(args)
  if (args.search) {
    search = '"' + args.search.split(" ").join('" "') + '"';
    andQuery.push({ $text: { $search: search } });
  }
  if (args.skill) {
    skills = args.skill.match(/\w+/g);
    for (let i = 0; i < skills.length; i++) {
      skillSearch.push({
        skills: {
          $elemMatch: { $regex: ".*" + skills[i] + ".*", $options: "i" },
        },
      });
    }
    andQuery.push({ $and: skillSearch });
  }
  if (args.grad_year) {
    grad_years = args.grad_year.match(/\w+/g);
    for (let i = 0; i < grad_years.length; i++) {
      yearSearch.push({ grad_year: grad_years[i] });
    }
    andQuery.push({ $or: yearSearch });
  }
  if (args.school) {
    schools = args.school.split(",");
    for (let i = 0; i < schools.length; i++) {
      schoolSearch.push({ school: schools[i] });
    }
    andQuery.push({ $or: schoolSearch });
  }
  console.log(andQuery)
  if(andQuery.length > 0) {
    users = await User.find({
      $and: andQuery,
      visible: 1,
    });
  } else {
    users = await User.find({ visible: 1 });
  }
  
  users = users
    .sort(function (a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
    })
    .filter((item) => {
      return item.uuid != context.uuid && !item.team && item.visible == 1;
    });

  return users;
};

export default getUsers;
