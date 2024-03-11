using System;
using System.Data;
using System.Data.OleDb;
using System.Windows.Forms;

public static class Utils
{
 //   this.thanhlap.Format = DateTimePickerFormat.Custom;
 //   this.thanhlap.CustomFormat = "MM/dd/yyyy";
        
    public static OleDbConnection GetOleDBConnection(string path)
    {
        try
        {
            OleDbConnection conn = new OleDbConnection($"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={path}");
            conn.Open();
            return conn;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in GetOleDBConnection: {ex.Message}");
            return null;
        }
    }

    public static OleDbDataAdapter GetOleDBDataAdapter(OleDbConnection conn, string command)
    {
        try
        {
            OleDbDataAdapter adapter = new OleDbDataAdapter(command, conn);
            return adapter;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in GetOleDBDataAdapter: {ex.Message}");
            return null;
        }
    }

    public static DataTable GetDataTable(OleDbDataAdapter oleAdapter)
    {
        try
        {
            DataTable dt = new DataTable();
            oleAdapter.Fill(dt);
            return dt;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in GetDataTable: {ex.Message}");
            return null;
        }
    }

    public static bool ModifiedRow(string col, object val, DataRow r, DataTable t)
    {
        try
        {
            if (t.Columns.Contains(col))
            {
                foreach (DataRow row in t.Rows)
                {
                    if (row[col].Equals(val))
                    {
                        int index = t.Rows.IndexOf(row);
                        t.Rows.Remove(row);
                        t.Rows.InsertAt(r, index);
                        return true;
                    }
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in ModifiedRow: {ex.Message}");
            return false;
        }
    }


    public static bool UpdateOleDb(OleDbDataAdapter adapter, DataTable dt)
    {
        try
        {


            OleDbCommandBuilder builder = new OleDbCommandBuilder(adapter);
            adapter.UpdateCommand = builder.GetUpdateCommand();
            adapter.InsertCommand = builder.GetInsertCommand();
            adapter.DeleteCommand = builder.GetDeleteCommand();
            adapter.Update(dt);
            return true;
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in UpdateOleDb: {ex.Message}");
            return false;
        }
    }

    public static void AddRow(DataTable t, string[] k, object[] v)
    {
        try
        {
            if (k.Length != v.Length)
            {
                MessageBox.Show("Error in AddRow: The number of keys and values must be the same.");
                return;
            }

            DataRow newRow = t.NewRow();

            for (int i = 0; i < k.Length; i++)
            {
                if (!t.Columns.Contains(k[i]))
                {
                    MessageBox.Show($"Error in AddRow: Column '{k[i]}' does not exist in the DataTable.");
                    return;
                }

                if (t.PrimaryKey.Length > 0 && Array.IndexOf(t.PrimaryKey, t.Columns[k[i]]) != -1)
                {
                    DataRow[] existingRows = t.Select($"{k[i]} = '{v[i]}'");
                    if (existingRows.Length > 0)
                    {
                        MessageBox.Show($"Error in AddRow: Duplicate primary key value '{v[i]}' for column '{k[i]}'.");
                        return;
                    }
                }
                else if (t.Columns[k[i]].Unique)
                {
                    DataRow[] existingRows = t.Select($"{k[i]} = '{v[i]}'");
                    if (existingRows.Length > 0)
                    {
                        MessageBox.Show($"Error in AddRow: Duplicate value '{v[i]}' for column '{k[i]}' which has unique constraint.");
                        return;
                    }
                }

                newRow[k[i]] = v[i];
            }

            t.Rows.Add(newRow);
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Error in AddRow: {ex.Message}");
        }
    }

}

