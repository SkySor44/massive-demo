SELECT 
    incidents.id, 
    state, 
    injuries.name as injury, 
    affectedareas.name as affectedArea, 
    causes.name as cause 
FROM incidents
join injuries on incidents.injuryid = injuries.id
join affectedAreas on injuries.affectedAreaId = affectedAreas.id
join causes on incidents.causeId = causes.id
