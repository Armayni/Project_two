Select
aa.police_district,
aa.offense_category,
aa.Total_Crimes,
aa.row_num
from(
select

c."Police_District" as police_district,
c."Offense_Category" as offense_category,
count(c."Offense_Category") as Total_Crimes,
row_number() over (Partition by c."Police_District"  Order by count(c."Offense_Category") desc) as row_num
from sacramento_crime as c
where c."Police_District" in ('1','2','3','4','5','6')

group by c."Police_District", c."Offense_Category"
) aa
where aa.row_num = 1
--order by c."Police_District", Total_Crimes desc