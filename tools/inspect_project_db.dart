import 'dart:io';

import 'package:sqlite3/sqlite3.dart';

void main(List<String> args) {
  for (final filePath in args) {
    final file = File(filePath);
    print(filePath);
    if (!file.existsSync()) {
      print('missing');
      continue;
    }

    final db = sqlite3.open(filePath);
    try {
      for (final table in [
        'categories',
        'projects',
        'milestones',
        'milestone_items',
        'milestone_item_children',
        'project_links',
        'draft_state',
      ]) {
        final count = db.select('SELECT COUNT(*) AS count FROM $table').first;
        print('$table: ${count['count']}');
      }

      final projects = db.select(
        'SELECT id, title, is_archived, is_completed FROM projects ORDER BY id LIMIT 10',
      );
      for (final row in projects) {
        print(
          'project ${row['id']}: ${row['title']} archived=${row['is_archived']} completed=${row['is_completed']}',
        );
      }
    } finally {
      db.dispose();
    }
    print('');
  }
}
