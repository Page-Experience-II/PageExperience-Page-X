# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(first_name: 'Evin', last_name: 'Luiz', password:'evin', email: 'evin@eycon.com',phone:'619-394-1366', school:'San Diego State Univrsity',profession: 'Artist',location:'San Diego',bio:'Artist living in san diego')
User.create(first_name: 'Test1', last_name: 'one', password:'test1', email: 'test1@eycon.com',phone:'619-394-1366', school:'San Jose State university',profession: 'Artist',location:'San Jose',bio:'Artist living in san jose')
User.create(first_name: 'Test2', last_name: 'two', password:'test2', email: 'test2@eycon.com',phone:'619-394-1366', school:'sdsu',profession: 'Artist',location:'San Diego',bio:'Artist living in san diego')


#Seed AccessTypes
Accesstype.create(accesstype: 'Public')
Accesstype.create(accesstype: 'Restricted')

#Seed PublicationTypes
Publicationtype.create(publicationtype: 'Update')
Publicationtype.create(publicationtype: 'Work')

#seed WorkTypes
Worktype.create(worktype: 'Poem')
Worktype.create(worktype: 'Lyrics')
Worktype.create(worktype: 'Essay')