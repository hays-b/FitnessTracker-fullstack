const mapActivities = (routines) => {
  let map = {};

  if (routines.length) {
    for (const row of routines) {
      if (!map[row.id]) {
        map[row.id] = {
          id: row.id,
          creatorId: row.creatorId,
          creatorName: row.creatorName,
          isPublic: row.isPublic,
          name: row.name,
          goal: row.goal,
          activities: [],
        };
      }
      if (row.activityId) {
        map[row.id].activities.push({
          id: row.activityId,
          name: row.activityName,
          description: row.activityDescription,
          sets: row.activitySets,
          reps: row.activityReps,
          duration: row.activityDuration,
        });
      }
    }

    return Object.values(map);
  } else {
    return routines;
  }
};

module.exports = {
    mapActivities
  };