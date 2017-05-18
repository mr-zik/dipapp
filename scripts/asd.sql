SELECT * FROM `flats_rent`
LEFT JOIN `images_flat_sell`
ON `flats_rent`.obj_id = `images_flat_sell`.obj_id
AND `images_flat_sell`.status = 'main'
WHERE `flats_rent`.addr_city = 'Минск' 
AND `flats_rent`.addr_street = 'Я.Коласа'
AND `flats_rent`.addr_metro = 'Академия Наук'
AND `flats_rent`.obj_rooms_num = '1'
AND `flats_rent`.rent_time = 'длительный срок'
AND `flats_rent`.obj_type = 'type'